<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./style.css">
    <script src="https://cdn.tailwindcss.com"></script>
    <title>PHP Calculaotr</title>
</head>
<body>
  <?php require "./core/data.php"; ?>
  <div class="w-screen flex justify-center text-white mt-10">
    <form method="post" class="w-96 card bg-zinc-700 px-4 py-12">
      <?php require_once "./components/header.php"; ?>
      <?php require_once "./components/screen.php"; ?>
      <?php require "./components/number.php"; ?>
    </form>
  </div>
</body>
</html>