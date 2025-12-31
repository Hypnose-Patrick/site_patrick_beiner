/**
 * DIAGNOSTIC I.C.A.R.E. - VOYAGE DU HÉROS
 * Patrick Beiner - Lead Generation System
 */

// 15 QUESTIONS AVEC CONTEXTE
const questions = [
    {
        cat: "ENVIRONNEMENT (DILTS)",
        q: "Imaginez-vous au travail un lundi matin. En regardant autour de vous, que ressentez-vous sincèrement ?",
        opts: [
            {t:"Un brouillard épais. Je ne sais plus vraiment ce que je fais ici.", s:1},
            {t:"C'est confortable et sécurisant, mais terriblement monotone.", s:2},
            {t:"Je sens des tensions, mais c'est un terrain d'apprentissage utile.", s:3},
            {t:"Je suis exactement là où je dois être, mon environnement me porte.", s:4}
        ]
    },
    {
        cat: "L'APPEL (HÉROS)",
        q: "Dernièrement, avez-vous ressenti un 'signe' ou un événement qui vous pousse à changer ?",
        opts: [
            {t:"Non, c'est le calme plat (ou je suis trop occupé pour écouter).", s:1},
            {t:"Oui, une petite voix intérieure insiste, mais je l'ignore souvent.", s:2},
            {t:"Un choc brutal (perte, conflit, burn-out) m'a forcé à m'arrêter.", s:3},
            {t:"J'ai consciemment décidé qu'il était temps d'ouvrir un nouveau chapitre.", s:4}
        ]
    },
    {
        cat: "COMPORTEMENT (DILTS)",
        q: "Face à une situation professionnelle imprévue ou stressante, quelle est votre réaction instinctive ?",
        opts: [
            {t:"Je me fige ou je cherche à fuir la situation.", s:1},
            {t:"Je râle un peu, puis j'applique des solutions que je connais déjà.", s:2},
            {t:"J'observe, j'analyse et je tente une nouvelle approche.", s:3},
            {t:"Je souris intérieurement : l'obstacle est le chemin.", s:4}
        ]
    },
    {
        cat: "L'OMBRE (HÉROS)",
        q: "Si nous parlions honnêtement de vos peurs... Quelle place occupent-elles aujourd'hui ?",
        opts: [
            {t:"Elles me contrôlent. Souvent, je n'ose pas agir à cause d'elles.", s:1},
            {t:"Je suis en lutte constante contre elles, c'est épuisant.", s:2},
            {t:"Je commence à les écouter pour comprendre ce qu'elles protègent.", s:3},
            {t:"J'ai appris à danser avec. Mes peurs sont devenues des indicateurs.", s:4}
        ]
    },
    {
        cat: "CAPACITÉS (DILTS)",
        q: "Avez-vous le sentiment d'avoir les 'armes' et compétences nécessaires pour votre prochaine étape ?",
        opts: [
            {t:"J'ai l'impression d'être parti en haute montagne en sandales.", s:1},
            {t:"J'ai de bonnes bases techniques, mais il me manque le savoir-être.", s:2},
            {t:"J'apprends vite, je m'équipe au fur et à mesure du chemin.", s:3},
            {t:"Je possède un arsenal solide (soft & hard skills) prêt à l'emploi.", s:4}
        ]
    },
    {
        cat: "LE REFUS (HÉROS)",
        q: "Qu'est-ce qui vous a empêché, jusqu'à présent, de faire le grand saut ?",
        opts: [
            {t:"La peur de l'insécurité financière et du jugement des autres.", s:1},
            {t:"Je ne sais simplement pas par où commencer.", s:2},
            {t:"Je commence souvent, mais je m'essouffle en route.", s:3},
            {t:"Rien ne m'arrête, je suis déjà en mouvement.", s:4}
        ]
    },
    {
        cat: "CROYANCES (DILTS)",
        q: "Quelle petite phrase tourne en boucle dans votre tête quand vous pensez à vos rêves ?",
        opts: [
            {t:"\"C'est trop tard pour moi\" ou \"Je n'ai pas de chance\".", s:1},
            {t:"\"Il faut souffrir et travailler dur pour mériter le succès\".", s:2},
            {t:"\"Je suis capable d'apprendre et d'évoluer si je m'y mets\".", s:3},
            {t:"\"Tout est possible si je suis aligné avec ma mission\".", s:4}
        ]
    },
    {
        cat: "ALLIÉS (HÉROS)",
        q: "Regardez votre entourage actuel. Qui marche à vos côtés ?",
        opts: [
            {t:"Je me sens seul(e). Personne ne comprend vraiment mes aspirations.", s:1},
            {t:"J'ai des amis sympas, mais ils me conseillent de 'rester prudent'.", s:2},
            {t:"J'ai un ou deux soutiens clés qui croient en moi.", s:3},
            {t:"Je suis entouré d'une tribu (mentors, pairs) qui me tire vers le haut.", s:4}
        ]
    },
    {
        cat: "IDENTITÉ (DILTS)",
        q: "Si vous deviez vous présenter lors d'un dîner, comment vous définiriez-vous ?",
        opts: [
            {t:"Par mon métier actuel (même si je ne l'aime plus vraiment).", s:1},
            {t:"Je suis un peu flou... 'en réflexion' ou 'en transition'.", s:2},
            {t:"Comme un explorateur qui teste de nouveaux potentiels.", s:3},
            {t:"Je suis [Ma Nouvelle Identité] et je l'incarne pleinement.", s:4}
        ]
    },
    {
        cat: "L'ÉPREUVE (HÉROS)",
        q: "Quand vous traversez une crise majeure, quelle est votre stratégie de survie ?",
        opts: [
            {t:"Je m'effondre ou je me renferme sur moi-même.", s:1},
            {t:"Je serre les dents et j'attends que l'orage passe.", s:2},
            {t:"Je cherche activement la leçon cachée derrière l'épreuve.", s:3},
            {t:"Je l'utilise comme un feu pour forger une version plus forte de moi.", s:4}
        ]
    },
    {
        cat: "VALEURS (DILTS)",
        q: "Aujourd'hui, à quel point vos actions quotidiennes sont-elles alignées avec vos valeurs profondes ?",
        opts: [
            {t:"Il y a un grand écart. Je joue un rôle qui n'est pas moi.", s:1},
            {t:"Je fais des compromis pour garder la paix ou la sécurité.", s:2},
            {t:"J'essaie d'être authentique, même si ça crée parfois des frictions.", s:3},
            {t:"Totalement aligné. Je ne négocie plus avec mon intégrité.", s:4}
        ]
    },
    {
        cat: "VISION (HÉROS)",
        q: "Si vous aviez une baguette magique pour changer votre vie professionnelle instantanément...",
        opts: [
            {t:"Je voudrais juste que la pression et le stress s'arrêtent.", s:1},
            {t:"Je voudrais un travail mieux payé et plus tranquille.", s:2},
            {t:"Je lancerais enfin ce projet créatif qui me tient à cœur.", s:3},
            {t:"Je déploierais une œuvre qui impacte positivement le monde.", s:4}
        ]
    },
    {
        cat: "ÉNERGIE (RESSOURCES)",
        q: "Comment est votre niveau d'énergie vitale le matin ?",
        opts: [
            {t:"Le réservoir est vide. Je me traîne hors du lit.", s:1},
            {t:"Variable. Ça dépend des jours et de la caféine.", s:2},
            {t:"Bonne, surtout quand j'ai des tâches intéressantes prévues.", s:3},
            {t:"Haute et stable. J'ai hâte de commencer ma journée.", s:4}
        ]
    },
    {
        cat: "MISSION (DILTS)",
        q: "Au fond, pour qui ou pour quoi faites-vous tout cela ?",
        opts: [
            {t:"Pour survivre et payer les factures. C'est la vie.", s:1},
            {t:"Pour prouver ma valeur aux autres (parents, société).", s:2},
            {t:"Pour ma famille et pour me sentir utile.", s:3},
            {t:"Pour servir quelque chose de plus grand que moi (Légende Personnelle).", s:4}
        ]
    },
    {
        cat: "LE RETOUR (HÉROS)",
        q: "Imaginons que vous ayez réussi votre transformation. Que faites-vous ?",
        opts: [
            {t:"Je me repose enfin. J'ai mérité ma tranquillité.", s:1},
            {t:"Je profite de ma nouvelle situation pour moi et mes proches.", s:2},
            {t:"J'aide quelques personnes autour de moi à faire pareil.", s:3},
            {t:"Je transmets mon 'Élixir' (sagesse) à la communauté pour inspirer.", s:4}
        ]
    }
];

const profiles = {
    aspirant: {
        title: "L'Aspirant en Éveil",
        desc: "Vous entendez l'Appel, mais le brouillard est encore présent. Votre potentiel est immense, mais il est actuellement bridé par des doutes ou un environnement qui ne vous nourrit plus. Vous êtes à l'aube de votre transformation.",
        path: "Parcours Apprenti (4 semaines)",
        cta: "Démarrer l'Initiation",
        link: "formations.html#apprenti"
    },
    aventurier: {
        title: "L'Aventurier en Quête",
        desc: "Vous avez franchi le seuil. Vous êtes en mouvement, vous testez de nouvelles voies. Vous avez identifié votre quête, mais vous manquez encore de structure, d'outils ou d'alliés pour stabiliser cette transformation.",
        path: "Parcours Aventurier (12 semaines)",
        cta: "Rejoindre l'Expédition",
        link: "formations.html#aventurier"
    },
    heros: {
        title: "Le Héros en Métamorphose",
        desc: "Vous êtes en pleine ascension. Votre vision est claire, votre identité se cristallise. Vous ne cherchez plus seulement à changer de job, mais à accomplir votre Légende Personnelle. Vous êtes prêt pour le saut quantique.",
        path: "Parcours Héros (90 jours)",
        cta: "Réserver la Stratégie",
        link: "formations.html#heros"
    }
};

let currentQIndex = 0;
let totalScore = 0;
let userAnswers = [];

function startQuiz() {
    document.getElementById('screen-intro').classList.add('hidden-screen');
    document.getElementById('screen-quiz').classList.remove('hidden-screen');
    renderQuestion();
}

function renderQuestion() {
    const q = questions[currentQIndex];

    document.getElementById('question-counter').innerText = `${String(currentQIndex + 1).padStart(2, '0')} / ${questions.length}`;
    document.getElementById('question-category').innerText = q.cat;
    document.getElementById('question-text').innerText = q.q;

    const percent = ((currentQIndex) / questions.length) * 100;
    document.getElementById('progress-bar').style.width = `${percent}%`;

    const container = document.getElementById('options-container');
    container.innerHTML = '';

    q.opts.forEach(opt => {
        const btn = document.createElement('div');
        btn.className = "option-card cursor-pointer group flex items-start gap-4 p-5 rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 transition-all";
        btn.onclick = () => handleAnswer(opt.s, opt.t);
        btn.innerHTML = `
            <div class="option-indicator w-6 h-6 rounded-full border border-gray-500 group-hover:border-patrick-bronze mt-0.5 flex-shrink-0 transition-colors"></div>
            <span class="text-gray-200 group-hover:text-white text-lg font-light">${opt.t}</span>
        `;
        container.appendChild(btn);
    });
}

function handleAnswer(points, answerText) {
    totalScore += points;
    userAnswers.push({
        question: questions[currentQIndex].q,
        category: questions[currentQIndex].cat,
        answer: answerText,
        score: points
    });

    if (currentQIndex < questions.length - 1) {
        currentQIndex++;
        renderQuestion();
    } else {
        showAnalyzing();
    }
}

function showAnalyzing() {
    document.getElementById('screen-quiz').classList.add('hidden-screen');
    document.getElementById('screen-analyzing').classList.remove('hidden-screen');
    setTimeout(() => {
        document.getElementById('screen-analyzing').classList.add('hidden-screen');
        document.getElementById('screen-capture').classList.remove('hidden-screen');
        lucide.createIcons(); // Réinitialiser les icônes
    }, 3000);
}

function submitForm(e) {
    e.preventDefault();

    const btn = document.getElementById('submit-btn');
    btn.innerHTML = '<span>Génération du PDF...</span>';
    btn.disabled = true;

    const name = document.getElementById('user-name').value;
    const email = document.getElementById('user-email').value;
    const optinNewsletter = document.getElementById('optin-newsletter').checked;

    const percentage = Math.round((totalScore / (questions.length * 4)) * 100);
    let profileKey = 'aspirant';
    if (percentage > 40) profileKey = 'aventurier';
    if (percentage > 70) profileKey = 'heros';

    // Préparer les données pour l'envoi
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('score', totalScore);
    formData.append('percentage', percentage);
    formData.append('profile', profileKey);
    formData.append('optin_newsletter', optinNewsletter ? '1' : '0');
    formData.append('answers', JSON.stringify(userAnswers));

    // Envoyer au serveur PHP
    fetch('diagnostic-result.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showResult(name, email, profileKey, percentage);
        } else {
            alert('Erreur lors de l\'envoi : ' + data.message);
            btn.innerHTML = '<span>RÉVÉLER MON PROFIL</span> <i data-lucide="unlock" class="w-4 h-4"></i>';
            btn.disabled = false;
            lucide.createIcons();
        }
    })
    .catch(error => {
        console.error('Erreur:', error);
        // En cas d'erreur, on affiche quand même les résultats
        showResult(name, email, profileKey, percentage);
    });
}

function showResult(name, email, profileKey, percentage) {
    document.getElementById('screen-capture').classList.add('hidden-screen');
    document.getElementById('screen-result').classList.remove('hidden-screen');

    const profile = profiles[profileKey];

    document.getElementById('display-email').innerText = email;
    document.getElementById('result-title').innerText = profile.title;
    document.getElementById('result-score').innerText = `${percentage}%`;
    document.getElementById('result-desc').innerText = profile.desc;
    document.getElementById('result-path').innerText = profile.path;

    const ctaBtn = document.getElementById('result-cta');
    ctaBtn.href = profile.link;
    ctaBtn.innerHTML = `${profile.cta} <i data-lucide="chevron-right" class="w-5 h-5"></i>`;

    window.scrollTo(0, 0);
    lucide.createIcons();
}
