const heights = [0, 4, 0, 0, 0, 6, 0, 6, 4, 0];

function calculateWater(heights) {
    const n = heights.length;
    if (n <= 2) return 0;

    let leftMax = Array(n).fill(0);
    let rightMax = Array(n).fill(0);

    leftMax[0] = heights[0];
    for (let i = 1; i < n; i++) {
        leftMax[i] = Math.max(leftMax[i - 1], heights[i]);
    }

    rightMax[n - 1] = heights[n - 1];
    for (let i = n - 2; i >= 0; i--) {
        rightMax[i] = Math.max(rightMax[i + 1], heights[i]);
    }

    let waterTrapped = 0;
    for (let i = 0; i < n; i++) {
        waterTrapped += Math.min(leftMax[i], rightMax[i]) - heights[i];
    }
    console.log(waterTrapped);
    return waterTrapped;
}

function renderWaterTank(heights) {
    const svg = document.getElementById('water-tank');
    const n = heights.length;

    if (n <= 2) return;
    const blockSize = 40;
    const maxHeight = Math.max(...heights);
    svg.innerHTML = '';

    heights.forEach((height, index) => {
        const x = index * blockSize;
        const y = (maxHeight - height) * blockSize;
        const block = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        block.setAttribute('x', x);
        block.setAttribute('y', y);
        block.setAttribute('width', blockSize);
        block.setAttribute('height', height * blockSize);
        block.setAttribute('fill', '#3498db');
        svg.appendChild(block);
    });

    const waterLevel = maxHeight - heights.reduce((a, b) => a + b, 0) / n;
    const water = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    water.setAttribute('x', 0);
    water.setAttribute('y', waterLevel * blockSize);
    water.setAttribute('width', n * blockSize);
    water.setAttribute('height', calculateWater(heights) * blockSize);
    water.setAttribute('fill', 'rgba(52, 152, 219, 0.5)');
    svg.appendChild(water);
}
renderWaterTank(heights);
