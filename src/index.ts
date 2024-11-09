import { Hono } from 'hono'

const app = new Hono<{ Bindings: CloudflareBindings }>()

app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>疯狂乒乓球游戏</title>
        <style>
            canvas {
                border: 2px solid black;
                display: block;
                margin: 0 auto;
            }
        </style>
        <script>
            // 预加载音效
            const paddleHitSound = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");
            const wallHitSound = new Audio("data:audio/wav;base64,//uQRAAAAWMSLwUIYAAsYkXgoQwAEaYLWfkWgAI0wWs/ItAAAGDgYtAgAyN+QWaAAihwMWm4G8QQRDiMcCBcH3Cc+CDv/7xA4Tvh9Rz/y8QADBwMWgQAZG/ILNAARQ4GLTcDeIIIhxGOBAuD7hOfBB3/94gcJ3w+o5/5eIAIAAAVwWgQAVQ2ORaIQwEMAJiDg95G4nQL7mQVWI6GwRcfsZAcsKkJvxgxEjzFUgfHoSQ9Qq7KNwqHwuB13MA4a1q/DmBrHgPcmjiGoh//EwC5nGPEmS4RcfkVKOhJf+WOgoxJclFz3kgn//dBA+ya1GhurNn8zb//9NNutNuhz31f////9vt///z+IdAEAAAK4LQIAKobHItEIYCGAExBwe8jcToF9zIKrEdDYIuP2MgOWFSE34wYiR5iqQPj0JIeoVdlG4VD4XA67mAcNa1fhzA1jwHuTRxDUQ//iYBczjHiTJcIuPyKlHQkv/LHQUYkuSi57yQT//uggfZNajQ3Vmz+Zt//+mm3Wm3Q576v////+32///5/EOgAAADVghQAAAAA//uQZAUAB1WI0PZugAAAAAoQwAAAEk3nRd2qAAAAACiDgAAAAAAABCqEEQRLCgwpBGMlJkIz8jKhGvj4k6jzRnqasNKIeoh5gI7BJaC1A1AoNBjJgbyApVS4IDlZgDU5WUAxEKDNmmALHzZp0Fkz1FMTmGFl1FMEyodIavcCAUHDWrKAIA4aa2oCgILEBupZgHvAhEBcZ6joQBxS76AgccrFlczBvKLC0QI2cBoCFvfTDAo7eoOQInqDPBtvrDEZBNYN5xwNwxQRfw8ZQ5wQVLvO8OYU+mHvFLlDh05Mdg7BT6YrRPpCBznMB2r//xKJjyyOh+cImr2/4doscwD6neZjuZR4AgAABYAAAABy1xcdQtxYBYYZdifkUDgzzXaXn98Z0oi9ILU5mBjFANmRwlVJ3/6jYDAmxaiDG3/6xjQQCCKkRb/6kg/wW+kSJ5//rLobkLSiKmqP/0ikJuDaSaSf/6JiLYLEYnW/+kXg1WRVJL/9EmQ1YZIsv/6Qzwy5qk7/+tEU0nkls3/zIUMPKNX/6yZLf+kFgAfgGyLFAUwY//uQZAUABcd5UiNPVXAAAApAAAAAE0VZQKw9ISAAACgAAAAAVQIygIElVrFkBS+Jhi+EAuu+lKAkYUEIsmEAEoMeDmCETMvfSHTGkF5RWH7kz/ESHWPAq/kcCRhqBtMdokPdM7vil7RG98A2sc7zO6ZvTdM7pmOUAZTnJW+NXxqmd41dqJ6mLTXxrPpnV8avaIf5SvL7pndPvPpndJR9Kuu8fePvuiuhorgWjp7Mf/PRjxcFCPDkW31srioCExivv9lcwKEaHsf/7ow2Fl1T/9RkXgEhYElAoCLFtMArxwivDJJ+bR1HTKJdlEoTELCIqgEwVGSQ+hIm0NbK8WXcTEI0UPoa2NbG4y2K00JEWbZavJXkYaqo9CRHS55FcZTjKEk3NKoCYUnSQ0rWxrZbFKbKIhOKPZe1cJKzZSaQrIyULHDZmV5K4xySsDRKWOruanGtjLJXFEmwaIbDLX0hIPBUQPVFVkQkDoUNfSoDgQGKPekoxeGzA4DUvnn4bxzcZrtJyipKfPNy5w+9lnXwgqsiyHNeSVpemw4bWb9psYeq//uQZBoABQt4yMVxYAIAAAkQoAAAHvYpL5m6AAgAACXDAAAAD59jblTirQe9upFsmZbpMudy7Lz1X1DYsxOOSWpfPqNX2WqktK0DMvuGwlbNj44TleLPQ+Gsfb+GOWOKJoIrWb3cIMeeON6lz2umTqMXV8Mj30yWPpjoSa9ujK8SyeJP5y5mOW1D6hvLepeveEAEDo0mgCRClOEgANv3B9a6fikgUSu/DmAMATrGx7nng5p5iimPNZsfQLYB2sDLIkzRKZOHGAaUyDcpFBSLG9MCQALgAIgQs2YunOszLSAyQYPVC2YdGGeHD2dTdJk1pAHGAWDjnkcLKFymS3RQZTInzySoBwMG0QueC3gMsCEYxUqlrcxK6k1LQQcsmyYeQPdC2YfuGPASCBkcVMQQqpVJshui1tkXQJQV0OXGAZMXSOEEBRirXbVRQW7ugq7IM7rPWSZyDlM3IuNEkxzCOJ0ny2ThNkyRai1b6ev//3dzNGzNb//4uAvHT5sURcZCFcuKLhOFs8mLAAEAt4UWAAIABAAAAAB4qbHo0tIjVkUU//uQZAwABfSFz3ZqQAAAAAngwAAAE1HjMp2qAAAAACZDgAAAD5UkTE1UgZEUExqYynN1qZvqIOREEFmBcJQkwdxiFtw0qEOkGYfRDifBui9MQg4QAHAqWtAWHoCxu1Yf4VfWLPIM2mHDFsbQEVGwyqQoQcwnfHeIkNt9YnkiaS1oizycqJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");

            // 设置音量
            paddleHitSound.volume = 0.3;
            wallHitSound.volume = 0.2;

            function playSound(sound) {
                // 创建音效的克隆以支持重叠播放
                const soundClone = sound.cloneNode();
                soundClone.play().catch(e => console.log("Sound play failed:", e));
            }
        </script>
    </head>
    <body>
        <div id="startScreen" style="text-align: center; margin: 20px;">
            <h1>疯狂乒乓球</h1>
            <h2>游戏说明:对战电脑时用鼠标控制，对战玩家时左边用w键和s键控制，右边用鼠标控制，球的碰撞会随机发生变化，且球速会越来越快</h2>
            <button id="pvpButton" style="font-size: 20px; margin: 10px; padding: 10px;">玩家对战</button>
            <button id="pveButton" style="font-size: 20px; margin: 10px; padding: 10px;">对战电脑</button>
        </div>
        <div id="gameUI" style="text-align: center; margin: 10px; display: none;">
            <div id="scoreBoard" style="font-size: 24px; margin-bottom: 10px;">
                <span id="leftScore">0</span> - <span id="rightScore">0</span>
            </div>
            <button id="pauseButton" style="font-size: 16px; margin: 5px; padding: 5px;">暂停 (P)</button>
            <button id="menuButton" style="font-size: 16px; margin: 5px; padding: 5px;">返回主菜单 (M)</button>
        </div>
        <canvas id="gameCanvas" width="1200" height="500" style="display: none;"></canvas>
        <script>
            const canvas = document.getElementById('gameCanvas');
            const startScreen = document.getElementById('startScreen');
            const ctx = canvas.getContext('2d');
            
            let gameMode = ''; // 'PVP' 或 'PVE'
            let gameStarted = false;

            // 添加新的游戏状态变量
            let isPaused = false;
            let leftScore = 0;
            let rightScore = 0;

            // 定义游戏对象
            let ball = {
                x: canvas.width/2,
                y: canvas.height/2,
                radius: 10,
                speedX: 3,
                speedY: 3,
                maxSpeed: 15
            };
            
            let leftPaddle = {
                x: 20,
                y: canvas.height/2 - 50,  // 初始位置居中
                width: 10,
                height: 100,
                speed: 50
            };
            
            let rightPaddle = {
                x: canvas.width - 30,
                y: canvas.height/2 - 50,  // 初始位置居中
                width: 10,
                height: 100,
                speed: 8
            };

            function resetGame() {
                // 重置球的位置和速度
                ball = {
                    x: canvas.width/2,
                    y: canvas.height/2,
                    radius: 10,
                    speedX: (Math.random() > 0.5 ? 3 : -3),  // 随机初始方向
                    speedY: (Math.random() > 0.5 ? 3 : -3),
                    maxSpeed: 25
                };
                
                // 重置球拍位置
                leftPaddle.y = canvas.height/2 - 50;
                rightPaddle.y = canvas.height/2 - 50;

                leftScore = 0;
                rightScore = 0;
                updateScoreDisplay();
            }

            function updateScoreDisplay() {
                document.getElementById('leftScore').textContent = leftScore.toString();
                document.getElementById('rightScore').textContent = rightScore.toString();
            }

            // 开始界面按钮事件
            document.getElementById('pvpButton').addEventListener('click', () => {
                startGame('PVP');
            });
            
            document.getElementById('pveButton').addEventListener('click', () => {
                startGame('PVE');
            });

            function startGame(mode) {
                gameMode = mode;
                gameStarted = true;
                isPaused = false;
                startScreen.style.display = 'none';
                document.getElementById('gameUI').style.display = 'block';
                canvas.style.display = 'block';
                resetGame();
                gameLoop();
            }

            function returnToMenu() {
                gameStarted = false;
                isPaused = false;
                canvas.style.display = 'none';
                document.getElementById('gameUI').style.display = 'none';
                startScreen.style.display = 'block';
            }

            // AI 控制逻辑
            function updateAI() {
                // 调试日志
                console.log('AI updating', {
                    ballX: ball.x,
                    ballY: ball.y,
                    paddleY: rightPaddle.y,
                    speedX: ball.speedX
                });

                // 设置基础速度
                const aiSpeed = 8;

                // 简化AI逻辑，使其更可靠
                const paddleCenter = rightPaddle.y + rightPaddle.height / 2;
                const ballFutureY = ball.y + (ball.speedY * (rightPaddle.x - ball.x) / ball.speedX);
                
                // 添加一些预测，但保持简单
                let targetY = ballFutureY;
                
                // 确保目标位置在画布范围内
                targetY = Math.max(rightPaddle.height / 2, 
                                 Math.min(canvas.height - rightPaddle.height / 2, targetY));

                // 移动球拍
                if (Math.abs(paddleCenter - targetY) > aiSpeed) {
                    if (paddleCenter < targetY) {
                        rightPaddle.y += aiSpeed;
                    } else {
                        rightPaddle.y -= aiSpeed;
                    }
                }

                // 确保球拍不会移出画布
                rightPaddle.y = Math.max(0, 
                                Math.min(canvas.height - rightPaddle.height, rightPaddle.y));
            }

            // 修改鼠标控制逻辑
            canvas.addEventListener('mousemove', (e) => {
                if (!gameStarted) return;
                
                const rect = canvas.getBoundingClientRect();
                const mouseY = e.clientY - rect.top;
                
                if (gameMode === 'PVP') {
                    // PVP模式下控制右球拍
                    rightPaddle.y = mouseY - rightPaddle.height/2;
                    if(rightPaddle.y < 0) rightPaddle.y = 0;
                    if(rightPaddle.y > canvas.height - rightPaddle.height) {
                        rightPaddle.y = canvas.height - rightPaddle.height;
                    }
                } else if (gameMode === 'PVE') {
                    // PVE模式下控制左球拍
                    leftPaddle.y = mouseY - leftPaddle.height/2;
                    if(leftPaddle.y < 0) leftPaddle.y = 0;
                    if(leftPaddle.y > canvas.height - leftPaddle.height) {
                        leftPaddle.y = canvas.height - leftPaddle.height;
                    }
                }
            });

            // 修改键盘控制逻辑，只在PVP模式下生效
            document.addEventListener('keydown', (e) => {
                if (!gameStarted) return;
                
                // 暂停和菜单控制保持不变
                if (e.key === 'p' || e.key === 'P') {
                    isPaused = !isPaused;
                }
                if (e.key === 'm' || e.key === 'M') {
                    returnToMenu();
                }
                
                // 键盘控制左球拍只在PVP模式下生效
                if (gameMode === 'PVP') {
                    if((e.key === 'w' || e.key === 'W') && leftPaddle.y > 0) {
                        leftPaddle.y -= leftPaddle.speed;
                    }
                    if((e.key === 's' || e.key === 'S') && leftPaddle.y < canvas.height - leftPaddle.height) {
                        leftPaddle.y += leftPaddle.speed;
                    }
                }
            });

            // 添加按钮事件监听
            document.getElementById('pauseButton').addEventListener('click', () => {
                if (gameStarted) isPaused = !isPaused;
            });

            document.getElementById('menuButton').addEventListener('click', returnToMenu);

            function update() {
                if (!gameStarted || isPaused) return;

                // 确保在PVE模式下更新AI
                if (gameMode === 'PVE') {
                    updateAI();
                }

                ball.x += ball.speedX;
                ball.y += ball.speedY;
                
                // 球碰到上下边界时的反弹逻辑
                if(ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
                    ball.speedY = -ball.speedY;
                    
                    // 播放边界碰撞音效
                    playSound(wallHitSound);
                    
                    // 限制角度范围，确保有足够的水平速度
                    const maxAngle = Math.PI/6;
                    const randomAngle = (Math.random() - 0.5) * maxAngle;
                    const currentSpeed = Math.sqrt(ball.speedX * ball.speedX + ball.speedY * ball.speedY);
                    
                    const direction = ball.speedX > 0 ? 1 : -1;
                    const minHorizontalRatio = 0.5;
                    ball.speedX = direction * Math.max(Math.abs(currentSpeed * Math.cos(randomAngle)), 
                                                     currentSpeed * minHorizontalRatio);
                    ball.speedY = (ball.y + ball.radius > canvas.height ? -1 : 1) * 
                                 Math.sqrt(currentSpeed * currentSpeed - ball.speedX * ball.speedX);
                    
                    // 确保球不会卡在边界
                    if(ball.y + ball.radius > canvas.height) {
                        ball.y = canvas.height - ball.radius;
                    }
                    if(ball.y - ball.radius < 0) {
                        ball.y = ball.radius;
                    }
                    
                    // 边界碰撞也增加球速
                    const speedIncrease = Math.random() * 1;  // 随机增加0~1的速度
                    if (currentSpeed < ball.maxSpeed) {
                        ball.speedX *= (1 + speedIncrease);
                        ball.speedY *= (1 + speedIncrease);
                    }
                }
                
                // 球碰到左球拍
                if(ball.x - ball.radius < leftPaddle.x + leftPaddle.width &&
                   ball.y > leftPaddle.y && 
                   ball.y < leftPaddle.y + leftPaddle.height) {
                    // 播放球拍碰撞音效
                    playSound(paddleHitSound);
                    
                    // 计算击球位置相对于球拍中心的位置
                    const relativeIntersectY = (leftPaddle.y + (leftPaddle.height/2)) - ball.y;
                    const normalizedIntersectY = relativeIntersectY / (leftPaddle.height/2);
                    
                    // 根据击球位置决定基础角度
                    let baseAngle = normalizedIntersectY * Math.PI/3; // 最大60度角
                    
                    // 在中间区域添加随机角度
                    if (Math.abs(normalizedIntersectY) < 0.5) { // 当击球位置在中间区域时
                        const randomAngle = (Math.random() - 0.5) * Math.PI/3; // 随机±60度
                        baseAngle += randomAngle;
                    }
                    
                    // 确保角度不会太极端
                    baseAngle = Math.max(Math.min(baseAngle, Math.PI/2.5), -Math.PI/2.5);
                    
                    const speed = Math.sqrt(ball.speedX * ball.speedX + ball.speedY * ball.speedY);
                    ball.speedX = Math.abs(speed * Math.cos(baseAngle));
                    ball.speedY = -speed * Math.sin(baseAngle);
                    increaseBallSpeed();
                }
                
                // 球碰到右球拍
                if(ball.x + ball.radius > rightPaddle.x &&
                   ball.y > rightPaddle.y && 
                   ball.y < rightPaddle.y + rightPaddle.height) {
                    // 播放球拍碰撞音效
                    playSound(paddleHitSound);
                    
                    // 计算击球位置相对于球拍中心的位置
                    const relativeIntersectY = (rightPaddle.y + (rightPaddle.height/2)) - ball.y;
                    const normalizedIntersectY = relativeIntersectY / (rightPaddle.height/2);
                    
                    // 根据击球位置决定基础角度
                    let baseAngle = normalizedIntersectY * Math.PI/3; // 最大60度角
                    
                    // 在中间区域添加随机角度
                    if (Math.abs(normalizedIntersectY) < 0.5) { // 当击球位置在中间区域时
                        const randomAngle = (Math.random() - 0.5) * Math.PI/3; // 随机±60度
                        baseAngle += randomAngle;
                    }
                    
                    // 确保角度不会太极端
                    baseAngle = Math.max(Math.min(baseAngle, Math.PI/2.5), -Math.PI/2.5);
                    
                    const speed = Math.sqrt(ball.speedX * ball.speedX + ball.speedY * ball.speedY);
                    ball.speedX = -Math.abs(speed * Math.cos(baseAngle));
                    ball.speedY = -speed * Math.sin(baseAngle);
                    increaseBallSpeed();
                }
                
                // 修改球出界逻辑，增加计分
                if (ball.x < 0) {
                    rightScore++;
                    updateScoreDisplay();
                    resetBall();
                } else if (ball.x > canvas.width) {
                    leftScore++;
                    updateScoreDisplay();
                    resetBall();
                }
            }

            function resetBall() {
                ball.x = canvas.width/2;
                ball.y = canvas.height/2;
                ball.speedX = (Math.random() > 0.5 ? 3 : -3);
                ball.speedY = (Math.random() > 0.5 ? 3 : -3);
            }

            function increaseBallSpeed() {
                const speedIncrease = Math.random() * 1;  // 随机增加0~1的速度
                const currentSpeed = Math.sqrt(ball.speedX * ball.speedX + ball.speedY * ball.speedY);
                
                if (currentSpeed < ball.maxSpeed) {
                    ball.speedX *= (1 + speedIncrease);
                    ball.speedY *= (1 + speedIncrease);
                }
            }

            function draw() {
                if (!gameStarted) return;
                
                // 清空画布
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                // 如果游戏暂停，显示暂停文字
                if (isPaused) {
                    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.fillStyle = 'white';
                    ctx.font = '48px Arial';
                    ctx.textAlign = 'center';
                    ctx.fillText('游戏暂停', canvas.width/2, canvas.height/2);
                    return;
                }

                // 画球
                ctx.beginPath();
                ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
                ctx.fillStyle = '#000';
                ctx.fill();
                ctx.closePath();
                
                // 画左边球拍
                ctx.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
                
                // 画右边球拍
                ctx.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);
            }

            // 不要立即启动游戏循环，等待用户选择游戏模式
            function gameLoop() {
                if (!gameStarted) {
                    if (animationFrameId) {
                        cancelAnimationFrame(animationFrameId);
                    }
                    return;
                }
                
                update();
                draw();
                animationFrameId = requestAnimationFrame(gameLoop);
            }
        </script>
    </body>
    </html>
  `)
})

export default app