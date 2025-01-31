function NotFoundHandler(app) {
  app.use((req, res, next) => {
    res.status(404).send(`
<!DOCTYPE html>
<html lang="fa">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title> صفحه 404 </title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      color: #fff;
      overflow: hidden;
      background: linear-gradient(to bottom, #87CEEB, #4682B4);
    }

    .content {
      position: relative;
      z-index: 10;
      text-align: center;
      padding: 40px;
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: 15px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
      animation: fadeIn 1.5s ease-in-out;
      margin: 15% auto;
      max-width: 600px;
    }

    h1 {
      font-size: 3rem;
      margin-bottom: 10px;
      color: #FFD700;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    }

    p {
      font-size: 1.2rem;
      color: #fff;
      margin-bottom: 20px;
    }

    .content a {
      display: inline-block;
      margin-top: 20px;
      padding: 12px 30px;
      background-color: #FF4500;
      color: #fff;
      text-decoration: none;
      border-radius: 5px;
      transition: background-color 0.3s, transform 0.3s;
      box-shadow: 0 2px 4px rgba(0, 123, 255, 0.5);
    }

    .content a:hover {
      background-color: #FFD700;
      transform: scale(1.05);
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    /* استایل ابرهای متحرک با clip-path */
    .cloud {
      position: absolute;
      background: rgba(255, 255, 255, 0.8);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
      border-radius: 50px;
      animation: moveClouds linear infinite;
  
    }

    .cloud1 {
      width: 200px;
      height: 140px;
      top: 20%;
      left: -200px;
      animation-duration: 20s;
      animation-delay: 0s;
    }

    .cloud2 {
      width: 300px;
      height: 200px;
      top: 40%;
      left: -300px;
      animation-duration: 25s;
      animation-delay: 5s;
    }

    .cloud3 {
      width: 250px;
      height: 175px;
      top: 60%;
      left: -250px;
      animation-duration: 30s;
      animation-delay: 10s;
    }

    .cloud4 {
      width: 150px;
      height: 100px;
      top: 30%;
      left: -150px;
      animation-duration: 15s;
      animation-delay: 2s;
    }

    .cloud5 {
      width: 350px;
      height: 230px;
      top: 50%;
      left: -350px;
      animation-duration: 35s;
      animation-delay: 8s;
    }

    .cloud6 {
      width: 100px;
      height: 70px;
      top: 70%;
      left: -100px;
      animation-duration: 18s;
      animation-delay: 3s;
    }

    @keyframes moveClouds {
      0% { transform: translateX(0); }
      100% { transform: translateX(100vw); }
    }
  </style>
</head>
<body>
  <div class="cloud cloud1"></div>
  <div class="cloud cloud2"></div>
  <div class="cloud cloud3"></div>
  <div class="cloud cloud4"></div>
  <div class="cloud cloud5"></div>
  <div class="cloud cloud6"></div>
  <div class="content">
    <h1>خطای 404 - مسیر گم شده!</h1>
    <p>به نظر می‌رسد صفحه‌ای که به دنبالش هستید، جایی در این نقشه نیست. شاید بهتر است مسیر جدیدی پیدا کنید.</p>
    <a href="https://canadaimmigrationconsultants.ca/">بازگشت به صفحه اصلی</a>
  </div>
</body>
</html>

    `);
  });
}
module.exports = NotFoundHandler;
