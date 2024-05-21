document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");

    const window_height = 300;
    const window_width = 500;

    canvas.height = window_height;
    canvas.width = window_width;
    canvas.style.backgroundColor = "#b7f7ed";

    const coordinatesTable = document.getElementById('coordinatesTable');

    class Circle {
        constructor(id, x, y, radius, color, text, backcolor, speed) {
            this.id = id;
            this.posX = x;
            this.posY = y;
            this.radius = radius;
            this.color = color;
            this.text = text;
            this.backcolor = backcolor;
            this.speed = speed;

            this.dx = 1 * this.speed;
            this.dy = 1 * this.speed;
        }

        draw(context) {
            context.beginPath();
            context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
            context.fillStyle = this.backcolor;
            context.fill();

            context.lineWidth = 5;
            context.strokeStyle = this.color;
            context.stroke();

            context.textAlign = "center";
            context.textBaseline = "middle";
            context.font = "bold 20px cursive";
            context.fillStyle = "white";
            context.fillText(this.text, this.posX, this.posY);

            context.closePath();
        }

        update(context) {
            this.draw(context);

            if (this.posX + this.radius > window_width || this.posX - this.radius < 0) {
                this.dx = -this.dx;
            }

            if (this.posY + this.radius > window_height || this.posY - this.radius < 0) {
                this.dy = -this.dy;
            }

            this.posX += this.dx;
            this.posY += this.dy;
        }
    }

    const objects = [];

    for (let i = 1; i <= 10; i++) {
        let randomRadius = Math.floor(Math.random() * 30 + 20);
        let randomX = Math.random() * window_width;
        let randomY = Math.random() * window_height;
        let randomBackcolor = "rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")";
        let randomStrokecolor = "rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")";
        let randomSpeed = Math.random() * 3 + 1;

        randomX = randomX < randomRadius ? randomRadius : randomX > window_width - randomRadius ? window_width - randomRadius : randomX;
        randomY = randomY < randomRadius ? randomRadius : randomY > window_height - randomRadius ? window_height - randomRadius : randomY;

        let circle = new Circle(i, randomX, randomY, randomRadius, randomStrokecolor, i.toString(), randomBackcolor, randomSpeed);
        objects.push(circle);
    }

    function updateTable() {
        coordinatesTable.innerHTML = ''; // Clear the table
        objects.forEach(obj => {
            let row = document.createElement('tr');
            let cellId = document.createElement('td');
            let cellX = document.createElement('td');
            let cellY = document.createElement('td');

            cellId.textContent = obj.id;
            cellX.textContent = Math.round(obj.posX);
            cellY.textContent = Math.round(obj.posY);

            row.appendChild(cellId);
            row.appendChild(cellX);
            row.appendChild(cellY);

            coordinatesTable.appendChild(row);
        });
    }

    function animate() {
        ctx.clearRect(0, 0, window_width, window_height);
        objects.forEach(obj => {
            obj.update(ctx);
        });
        updateTable();
        requestAnimationFrame(animate);
    }

    animate();
});
