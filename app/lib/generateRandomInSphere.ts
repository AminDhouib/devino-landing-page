export function generateRandomInSphere(count: number, radius: number = 1.5): Float32Array {
    const points = new Float32Array(count * 3); // 3 coordinates (x, y, z) per point
    for (let i = 0; i < count; i++) {
        let x, y, z, lengthSquared;

        do {
            x = Math.random() * 2 - 1; // Random number between -1 and 1
            y = Math.random() * 2 - 1;
            z = Math.random() * 2 - 1;
            lengthSquared = x * x + y * y + z * z;
        } while (lengthSquared > 1 || lengthSquared === 0); // Discard points outside the unit sphere

        // Scale to the desired radius
        const scale = Math.cbrt(Math.random()) * radius; // Scale ensures uniform volume distribution
        points[i * 3] = x * scale;
        points[i * 3 + 1] = y * scale;
        points[i * 3 + 2] = z * scale;
    }
    return points;
}