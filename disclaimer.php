<?php
$page_title = "Disclaimer | MotoVerse";
$page_description = "Read the MotoVerse Disclaimer regarding the use of our website and its content.";
?>
<!DOCTYPE html>
<html lang="en">
<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title><?= $page_title ?></title>
<meta name="description" content="<?= $page_description ?>">

<link rel="stylesheet" href="style.css">
<link rel="stylesheet" href="article.css">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">

</head>

<body>

<header>
<div class="container">

<a href="index.php" class="logo">🏍 MotoVerse</a>

<nav>
<ul>
<li><a href="index.php">Home</a></li>
<li><a href="about.php">About</a></li>
<li><a href="contact.php">Contact</a></li>
</ul>
</nav>

</div>
</header>

<section class="article-hero">

<div class="container article-hero-content">

<span class="article-category">Disclaimer</span>

<h1>Website Disclaimer</h1>

<p>
The information published on MotoVerse is provided for general informational and educational purposes only.
</p>

</div>

</section>

<section class="article-wrapper">

<div class="container">

<div class="article-content">

<h2>General Information</h2>

<p>
MotoVerse makes every effort to publish accurate and up-to-date motorcycle-related content. However, we do not guarantee that all information is complete, accurate, or suitable for every situation.
</p>

<h2>Professional Advice</h2>

<p>
The content on this website should not be considered professional mechanical, legal, financial, or safety advice. Always consult qualified professionals before making important decisions or performing repairs.
</p>

<h2>External Websites</h2>

<p>
Our website may contain links to third-party websites. We are not responsible for their content, services, or privacy practices.
</p>

<h2>Affiliate & Advertising</h2>

<p>
MotoVerse may display advertisements or participate in affiliate programs. These partnerships help support the operation of the website and do not affect our editorial independence.
</p>

<h2>Contact</h2>

<p>
If you have any questions regarding this Disclaimer, please visit our
<a href="contact.php">Contact Page</a>.
</p>

<p><strong>Last Updated:</strong> <?= date("F d, Y"); ?></p>

</div>

</div>

</section>

<footer>

<div class="container">

<div class="copyright">
© <?= date("Y"); ?> MotoVerse. All Rights Reserved.
</div>

</div>

</footer>

<script src="script.js"></script>

</body>
</html>