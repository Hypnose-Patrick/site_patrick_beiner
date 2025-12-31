<?php
/**
 * DIAGNOSTIC I.C.A.R.E. - TRAITEMENT DES RÉSULTATS
 * Patrick Beiner - Lead Generation & Email Delivery
 */

header('Content-Type: application/json');

// Configuration
$recipient_admin = "patrick@pnl-formation.org"; // Votre email pour recevoir les leads
$reply_to_email = "patrick@pnl-formation.org";

// Vérifier que la requête est POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée']);
    exit;
}

// Récupérer les données du formulaire
$name = isset($_POST['name']) ? strip_tags(trim($_POST['name'])) : '';
$email = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : '';
$score = isset($_POST['score']) ? intval($_POST['score']) : 0;
$percentage = isset($_POST['percentage']) ? intval($_POST['percentage']) : 0;
$profile = isset($_POST['profile']) ? strip_tags(trim($_POST['profile'])) : 'aspirant';
$optin_newsletter = isset($_POST['optin_newsletter']) ? $_POST['optin_newsletter'] === '1' : false;
$answers_json = isset($_POST['answers']) ? $_POST['answers'] : '[]';

// Validation
if (empty($name) || empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Données invalides']);
    exit;
}

// Décoder les réponses
$answers = json_decode($answers_json, true);

// Définir les profils
$profiles = [
    'aspirant' => [
        'title' => 'L\'Aspirant en Éveil',
        'desc' => 'Vous entendez l\'Appel, mais le brouillard est encore présent. Votre potentiel est immense, mais il est actuellement bridé par des doutes ou un environnement qui ne vous nourrit plus.',
        'path' => 'Parcours Apprenti (4 semaines)',
        'price' => 'CHF 110.-',
        'link' => 'https://www.patrick-beiner.ch/formations.html#apprenti'
    ],
    'aventurier' => [
        'title' => 'L\'Aventurier en Quête',
        'desc' => 'Vous avez franchi le seuil. Vous êtes en mouvement, vous testez de nouvelles voies. Vous avez identifié votre quête, mais vous manquez encore de structure, d\'outils ou d\'alliés.',
        'path' => 'Parcours Aventurier (12 semaines)',
        'price' => 'CHF 309.-',
        'link' => 'https://www.patrick-beiner.ch/formations.html#aventurier'
    ],
    'heros' => [
        'title' => 'Le Héros en Métamorphose',
        'desc' => 'Vous êtes en pleine ascension. Votre vision est claire, votre identité se cristallise. Vous êtes prêt à accomplir votre Légende Personnelle.',
        'path' => 'Parcours Héros (90 jours)',
        'price' => 'CHF 1\'798.-',
        'link' => 'https://www.patrick-beiner.ch/formations.html#heros'
    ]
];

$profile_data = $profiles[$profile];

// ============================================
// EMAIL 1 : ENVOI AU CLIENT (Résultats détaillés)
// ============================================

$subject_client = "🎯 Votre Diagnostic I.C.A.R.E. - " . $profile_data['title'];

$body_client = "<!DOCTYPE html>
<html lang='fr'>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; background: #f4f4f4; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 20px auto; background: #fff; border-radius: 8px; overflow: hidden; }
        .header { background: linear-gradient(135deg, #244A32 0%, #3A6348 100%); color: #fff; padding: 40px 20px; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; font-weight: 700; }
        .header p { margin: 10px 0 0; opacity: 0.9; font-size: 14px; }
        .content { padding: 40px 30px; }
        .content h2 { color: #244A32; font-size: 24px; margin-bottom: 15px; }
        .content p { margin-bottom: 15px; color: #555; }
        .score-box { background: #fef9f3; border-left: 4px solid #c4a052; padding: 20px; margin: 20px 0; border-radius: 4px; }
        .score-box h3 { color: #c4a052; margin: 0 0 10px; font-size: 18px; }
        .score-value { font-size: 48px; font-weight: bold; color: #244A32; margin: 10px 0; }
        .cta-button { display: inline-block; background: #c4a052; color: #fff; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 0; }
        .cta-button:hover { background: #d4b86a; }
        .footer { background: #244A32; color: #fff; padding: 30px 20px; text-align: center; font-size: 12px; }
        .footer a { color: #c4a052; text-decoration: none; }
        .answers-list { background: #f9f9f9; padding: 20px; border-radius: 6px; margin: 20px 0; }
        .answer-item { margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #e0e0e0; }
        .answer-item:last-child { border-bottom: none; }
        .answer-category { color: #c4a052; font-size: 11px; text-transform: uppercase; font-weight: bold; letter-spacing: 1px; }
        .answer-question { color: #244A32; font-weight: 600; margin: 5px 0; }
        .answer-response { color: #666; font-size: 14px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1>🌟 Votre Profil Héroïque</h1>
            <p>Diagnostic I.C.A.R.E. - Résultats Personnalisés</p>
        </div>

        <div class='content'>
            <p>Bonjour <strong>" . htmlspecialchars($name) . "</strong>,</p>

            <p>Merci d'avoir pris le temps de compléter le diagnostic I.C.A.R.E. Voici votre analyse personnalisée basée sur vos 15 réponses.</p>

            <div class='score-box'>
                <h3>Votre Archétype Héroïque</h3>
                <h2 style='color: #244A32; margin: 10px 0;'>" . $profile_data['title'] . "</h2>
                <div class='score-value'>" . $percentage . "%</div>
                <p style='margin: 0;'><em>Alignement Héroïque</em></p>
            </div>

            <h2>📊 Votre Situation Actuelle</h2>
            <p>" . $profile_data['desc'] . "</p>

            <h2>🎯 Parcours Recommandé</h2>
            <p><strong>" . $profile_data['path'] . "</strong> - " . $profile_data['price'] . "</p>
            <p>Ce parcours a été spécialement conçu pour votre profil actuel. Il vous donnera les outils, la structure et l'accompagnement nécessaires pour franchir votre prochaine étape.</p>

            <div style='text-align: center; margin: 30px 0;'>
                <a href='" . $profile_data['link'] . "' class='cta-button'>🚀 Découvrir Mon Parcours</a>
            </div>

            <h2>📋 Vos Réponses Complètes</h2>
            <p style='font-size: 14px; color: #666;'>Voici le détail de vos réponses pour votre référence personnelle :</p>

            <div class='answers-list'>";

// Ajouter toutes les réponses
foreach ($answers as $index => $answer) {
    $body_client .= "
                <div class='answer-item'>
                    <div class='answer-category'>" . htmlspecialchars($answer['category']) . "</div>
                    <div class='answer-question'>Q" . ($index + 1) . ": " . htmlspecialchars($answer['question']) . "</div>
                    <div class='answer-response'>→ " . htmlspecialchars($answer['answer']) . " (" . $answer['score'] . "/4)</div>
                </div>";
}

$body_client .= "
            </div>

            <h2>🎁 Vos 3 Exercices d'Auto-Coaching</h2>
            <p><strong>Ces exercices pratiques vous aideront à démarrer immédiatement votre transformation :</strong></p>
            <ol>
                <li><strong>Cartographie de votre Ombre</strong> - Identifiez vos peurs inconscientes (15 min)</li>
                <li><strong>La Ligne du Temps Héroïque</strong> - Visualisez votre parcours passé et futur (20 min)</li>
                <li><strong>Ancrage de Ressource</strong> - Technique PNL pour accéder à votre état optimal (10 min)</li>
            </ol>
            <p style='background: #fff3cd; padding: 15px; border-radius: 6px; border-left: 4px solid #c4a052;'>
                <strong>📥 Les PDFs détaillés seront ajoutés prochainement.</strong><br>
                En attendant, je vous invite à réserver un appel découverte gratuit pour discuter de vos résultats.
            </p>

            <h2>🎯 Prochaine Étape</h2>
            <p>Vous avez 3 options pour avancer :</p>
            <ol>
                <li><strong>Appel Découverte Gratuit</strong> - 30 minutes pour clarifier votre situation</li>
                <li><strong>Rejoindre votre parcours recommandé</strong> - " . $profile_data['path'] . "</li>
                <li><strong>Continuer seul(e)</strong> - En utilisant les exercices ci-dessus</li>
            </ol>

            <div style='text-align: center; margin: 30px 0;'>
                <a href='https://www.patrick-beiner.ch/contact.html' class='cta-button'>📞 Réserver Mon Appel Découverte</a>
            </div>

            <p><em>« Le privilège d'une vie est de devenir qui vous êtes vraiment. » — C.G. Jung</em></p>
        </div>

        <div class='footer'>
            <p><strong>Patrick Beiner</strong><br>
            Coach en Réinsertion Professionnelle - Hypnothérapeute - Expert PNL</p>
            <p>Route du Grand clos 46, 1871 Choex, Suisse<br>
            📧 patrick@pnl-formation.org | 📱 076 490 23 12</p>
            <p style='margin-top: 15px;'><a href='https://www.patrick-beiner.ch'>www.patrick-beiner.ch</a></p>
        </div>
    </div>
</body>
</html>";

$headers_client = "From: Patrick Beiner <$reply_to_email>\r\n";
$headers_client .= "Reply-To: $reply_to_email\r\n";
$headers_client .= "MIME-Version: 1.0\r\n";
$headers_client .= "Content-Type: text/html; charset=UTF-8\r\n";

// ============================================
// EMAIL 2 : NOTIFICATION ADMIN (Lead)
// ============================================

$subject_admin = "🎯 NOUVEAU LEAD - Diagnostic I.C.A.R.E. : " . $name;

$body_admin = "NOUVEAU DIAGNOSTIC COMPLÉTÉ\n\n";
$body_admin .= "===== INFORMATIONS CONTACT =====\n";
$body_admin .= "Nom: $name\n";
$body_admin .= "Email: $email\n";
$body_admin .= "Date: " . date('d/m/Y H:i:s') . "\n\n";
$body_admin .= "===== RÉSULTATS =====\n";
$body_admin .= "Score Total: $score / 60\n";
$body_admin .= "Pourcentage: $percentage%\n";
$body_admin .= "Profil: " . $profile_data['title'] . "\n";
$body_admin .= "Parcours recommandé: " . $profile_data['path'] . "\n";
$body_admin .= "Opt-in Newsletter: " . ($optin_newsletter ? 'OUI' : 'NON') . "\n\n";
$body_admin .= "===== RÉPONSES DÉTAILLÉES =====\n\n";

foreach ($answers as $index => $answer) {
    $body_admin .= "Q" . ($index + 1) . " [" . $answer['category'] . "]\n";
    $body_admin .= $answer['question'] . "\n";
    $body_admin .= "→ " . $answer['answer'] . " (" . $answer['score'] . "/4)\n\n";
}

$body_admin .= "===== ACTION À FAIRE =====\n";
$body_admin .= "1. Ajouter le contact dans votre CRM\n";
$body_admin .= "2. Envoyer un email de suivi dans 2-3 jours\n";
$body_admin .= "3. Si opt-in newsletter : ajouter à la liste d'envoi\n\n";
$body_admin .= "---\n";
$body_admin .= "IP: " . $_SERVER['REMOTE_ADDR'] . "\n";

$headers_admin = "From: Diagnostic I.C.A.R.E. <noreply@patrick-beiner.ch>\r\n";
$headers_admin .= "Reply-To: $email\r\n";
$headers_admin .= "Content-Type: text/plain; charset=UTF-8\r\n";

// ============================================
// ENVOI DES EMAILS
// ============================================

$email_client_sent = mail($email, $subject_client, $body_client, $headers_client);
$email_admin_sent = mail($recipient_admin, $subject_admin, $body_admin, $headers_admin);

// Log dans un fichier (optionnel)
$log_entry = date('Y-m-d H:i:s') . " | $name | $email | $percentage% | $profile\n";
file_put_contents('diagnostic-leads.log', $log_entry, FILE_APPEND);

// Réponse JSON
if ($email_client_sent) {
    echo json_encode([
        'success' => true,
        'message' => 'Résultats envoyés avec succès',
        'profile' => $profile,
        'percentage' => $percentage
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Erreur lors de l\'envoi de l\'email'
    ]);
}
?>
