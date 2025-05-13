let model, webcamElement, canvas, ctx;
const classifier = knnClassifier.create();
const predictionElement = document.getElementById('prediction');
const trainStatus = document.getElementById('trainStatus');
const trainedCounts = {};

// Setup webcam and canvas
async function setup() {
  webcamElement = document.getElementById('webcam');
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 600;
  canvas.height = 450;

  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  webcamElement.srcObject = stream;

  return new Promise(resolve => {
    webcamElement.onloadedmetadata = () => resolve();
  });
}

// Load TensorFlow Handpose model
async function loadHandposeModel() {
  model = await handpose.load();
  console.log('✅ Handpose model loaded!');
}

// Draw hand landmarks
function drawHand(landmarks) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#60a5fa';

  const connections = [
    [0, 1], [1, 2], [2, 3], [3, 4],
    [5, 6], [6, 7], [7, 8],
    [9, 10], [10, 11], [11, 12],
    [13, 14], [14, 15], [15, 16],
    [17, 18], [18, 19], [19, 20],
    [0, 5], [5, 9], [9, 13], [13, 17], [17, 0]
  ];

  for (const [start, end] of connections) {
    const [x1, y1] = landmarks[start];
    const [x2, y2] = landmarks[end];
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  for (let i = 0; i < landmarks.length; i++) {
    const [x, y] = landmarks[i];
    ctx.beginPath();
    ctx.arc(x, y, 6, 0, 2 * Math.PI);
    const gradient = ctx.createRadialGradient(x, y, 1, x, y, 8);
    gradient.addColorStop(0, '#3b82f6');
    gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
    ctx.fillStyle = gradient;
    ctx.fill();
  }
}

// Real-time hand detection
async function detectHands() {
  const predictions = await model.estimateHands(webcamElement);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (predictions.length > 0) {
    const landmarks = predictions[0].landmarks;
    const confidence = predictions[0].handInViewConfidence;

    if (confidence > 0.75) {
      drawHand(landmarks);
      const input = tf.tensor([landmarks.flat()]);

      if (classifier.getNumClasses() > 0) {
        const result = await classifier.predictClass(input);
        const predictedLabel = result.label;
        predictionElement.innerText = predictedLabel;

        const box = document.getElementById('prediction-box');
        if (trainedCounts[predictedLabel]) {
          box.classList.remove('shake-wrong');
          box.classList.add('glow-correct');
          setTimeout(() => box.classList.remove('glow-correct'), 600);
        } else {
          box.classList.remove('glow-correct');
          box.classList.add('shake-wrong');
          setTimeout(() => box.classList.remove('shake-wrong'), 400);
        }
      }
    } else {
      predictionElement.innerText = "No hand detected";
    }
  }

  requestAnimationFrame(detectHands);
}

// Update training status
function updateTrainStatus(label) {
  if (!trainedCounts[label]) trainedCounts[label] = 0;
  trainedCounts[label]++;
  const text = Object.entries(trainedCounts)
    .map(([lbl, count]) => `${lbl}: ${count}`)
    .join(', ');
  trainStatus.innerText = `Samples trained — ${text}`;
}

// Keyboard shortcut training
window.addEventListener('keydown', async (event) => {
  const predictions = await model.estimateHands(webcamElement);
  if (predictions.length > 0) {
    const landmarks = predictions[0].landmarks;
    const confidence = predictions[0].handInViewConfidence;

    if (confidence > 0.75) {
      const input = tf.tensor([landmarks.flat()]);
      const label = event.key.toUpperCase();
      classifier.addExample(input, label);
      updateTrainStatus(label);
      console.log(`✅ Added sample for ${label}`);
    } else {
      console.log("⚠️ Low confidence – not added");
    }
  }
});

// Load classifier
async function loadClassifier() {
  const fileInput = document.getElementById('loadFile');
  const file = fileInput.files[0];
  if (!file) return alert('No file selected!');

  const reader = new FileReader();
  reader.onload = async (e) => {
    const datasetObj = JSON.parse(e.target.result);
    const tensorObj = {};

    Object.keys(datasetObj).forEach((key) => {
      const tensor = tf.tensor(datasetObj[key], [datasetObj[key].length / 63, 63]);
      tensorObj[key] = tensor;
    });

    classifier.setClassifierDataset(tensorObj);
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  };

  reader.readAsText(file);
}

// Run
(async () => {
  await setup();
  await loadHandposeModel();
  detectHands();
})();
