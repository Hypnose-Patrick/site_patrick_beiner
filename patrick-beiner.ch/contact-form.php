<?php
/**
 * FORMULAIRE DE CONTACT - Patrick Beiner
 * Traitement des messages de contact
 */

// Configuration
$recipient_email = "patrick@pnl-formation.org"; // Adresse email de reception
$redirect_success = "contact.html?success=1"; // Redirection en cas de succes
$redirect_error = "contact.html?error=1"; // Redirection en cas d'erreur

// Protection CSRF simple
session_start();

// Verifier que la requete est POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: contact.html");
    exit;
}

// Recuperer et nettoyer les donnees du formulaire
$prenom = isset($_POST['prenom']) ? strip_tags(trim($_POST['prenom'])) : '';
$email = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : '';
$message = isset($_POST['message']) ? strip_tags(trim($_POST['message'])) : '';

// Validation des champs
$errors = [];

if (empty($prenom)) {
    $errors[] = "Le prenom est requis.";
}

if (empty($email)) {
    $errors[] = "L'email est requis.";
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = "L'email n'est pas valide.";
}

if (empty($message)) {
    $errors[] = "Le message est requis.";
} elseif (strlen($message) < 10) {
    $errors[] = "Le message doit contenir au moins 10 caracteres.";
}

// Si des erreurs, rediriger avec message d'erreur
if (!empty($errors)) {
    header("Location: " . $redirect_error . "&msg=" . urlencode(implode(" ", $errors)));
    exit;
}

// Protection anti-spam basique (honeypot)
if (isset($_POST['website']) && !empty($_POST['website'])) {
    // C'est un bot, on redirige silencieusement
    header("Location: " . $redirect_success);
    exit;
}

// Preparation du message email
$email_subject = "Nouveau message de contact - Patrick Beiner";
$email_body = "Vous avez recu un nouveau message de contact:\n\n";
$email_body .= "Prenom: $prenom\n";
$email_body .= "Email: $email\n\n";
$email_body .= "Message:\n$message\n\n";
$email_body .= "---\n";
$email_body .= "Ce message a ete envoye depuis le formulaire de contact de votre site web.\n";
$email_body .= "Date: " . date('d/m/Y H:i:s') . "\n";
$email_body .= "IP: " . $_SERVER['REMOTE_ADDR'] . "\n";

// Headers de l'email
$headers = "From: $prenom <$email>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Envoi de l'email
if (mail($recipient_email, $email_subject, $email_body, $headers)) {
    // Succes - Email de confirmation automatique (optionnel)
    $confirm_subject = "Merci pour votre message - Patrick Beiner";
    $confirm_body = "Bonjour $prenom,\n\n";
    $confirm_body .= "Merci pour votre message. Je vous repondrai dans les plus brefs delais.\n\n";
    $confirm_body .= "Cordialement,\n";
    $confirm_body .= "Patrick Beiner\n";
    $confirm_body .= "Coach en reinsertion professionnelle - Hypnotherapeute\n";
    $confirm_body .= "076 490 23 12\n";
    $confirm_body .= "patrick@pnl-formation.org\n";

    $confirm_headers = "From: Patrick Beiner <$recipient_email>\r\n";
    $confirm_headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Envoyer l'email de confirmation
    mail($email, $confirm_subject, $confirm_body, $confirm_headers);

    // Redirection vers la page de succes
    header("Location: " . $redirect_success);
    exit;
} else {
    // Erreur lors de l'envoi
    header("Location: " . $redirect_error . "&msg=" . urlencode("Erreur lors de l'envoi du message. Veuillez reessayer."));
    exit;
}
?>
