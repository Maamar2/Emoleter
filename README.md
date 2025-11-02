# EmoLetr - Plateforme d'Analyse Émotionnelle

Une plateforme académique spécialisée pour l'analyse sophistiquée des émotions dans les textes littéraires algériens.

## Description

EmoLetr est une plateforme web moderne conçue pour analyser les émotions dans les textes français, avec une spécialisation en littérature post-coloniale algérienne. Développée par le laboratoire LAIRID de l'Université Mohamed Khider De Biskra.

## Fonctionnalités

- **Analyse de Texte**: Saisie directe ou import de fichiers (.txt, .pdf)
- **IA Spécialisée**: Modèles entraînés sur la littérature francophone
- **Visualisations**: Graphiques interactifs des émotions détectées
- **Export Multi-formats**: PDF, CSV, JSON selon le forfait
- **API REST**: Intégration dans vos applications (forfaits Pro et Institutionnel)
- **Support Multilingue**: Interface en français

## Design

Le site utilise une palette de couleurs moderne avec:
- **Couleur principale**: Violet (#6b46ff)
- **Dégradés**: Du violet au lavande
- **Arrière-plan**: Dégradé subtil bleu-violet (#e8e5ff à #e5f0ff)
- **Interface**: Design moderne et épuré avec animations fluides

## Structure du Projet

```
Emoleter/
├── index.html          # Page d'accueil avec tableau de bord
├── pricing.html        # Page des forfaits et tarifs
├── faq.html           # Questions fréquentes et support
├── styles.css         # Styles CSS complets
├── script.js          # JavaScript pour l'interactivité
└── README.md          # Documentation
```

## Installation

### Quick Start (Static Version)
1. Ouvrez `index.html` dans votre navigateur web
2. Interface fonctionnelle sans analyse LLM

### Full Setup (With Python Backend & LLM)
1. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Configure your API key:
   ```bash
   copy .env.example .env
   # Edit .env and add your OPENAI_API_KEY
   ```

3. Start the server:
   ```bash
   python app.py
   ```

4. Open browser to `http://localhost:5000`

**See [SETUP.md](SETUP.md) for detailed instructions**

## Utilisation

### Page d'Accueil (index.html)
- Saisie de texte pour analyse
- Import de fichiers
- Affichage des résultats d'analyse
- Informations sur le projet

### Page Tarifs (pricing.html)
- Trois forfaits: Étudiant (Gratuit), Professionnel (29,99€), Institutionnel (199,99€)
- Comparaison détaillée des fonctionnalités
- Partenariats universitaires
- Statistiques de la plateforme

### Page FAQ (faq.html)
- Questions fréquentes
- Certifications et conformité
- Support et contact
- Tarifs préférentiels académiques

## Technologies Utilisées

### Frontend
- **HTML5**: Structure sémantique
- **CSS3**: Styles modernes avec flexbox et grid
- **JavaScript (Vanilla)**: Interactivité sans frameworks
- **SVG**: Icônes vectorielles
- **Responsive Design**: Compatible mobile, tablette et desktop

### Backend
- **Python 3.8+**: Langage serveur
- **Flask**: Framework web léger
- **OpenAI API**: Intégration LLM pour analyse émotionnelle
- **PyPDF2**: Extraction de texte PDF
- **python-dotenv**: Gestion des variables d'environnement

## Fonctionnalités JavaScript

- Smooth scrolling pour la navigation
- Upload de fichiers avec validation
- Accordéon FAQ interactif
- Animations au scroll (Intersection Observer)
- Effet ripple sur les boutons
- Navbar qui se cache au scroll
- Effets hover sur les cartes
- Gestion des préférences (localStorage)

## Responsive

Le site est entièrement responsive avec des breakpoints à:
- **Mobile**: < 768px
- **Tablette**: 768px - 1024px
- **Desktop**: > 1024px

## Personnalisation

Pour modifier les couleurs principales, éditez les variables dans `styles.css`:

```css
/* Couleur principale */
background: linear-gradient(135deg, #6b46ff 0%, #8b5cf6 100%);

/* Arrière-plan */
background: linear-gradient(135deg, #e8e5ff 0%, #f0ecff 50%, #e5f0ff 100%);
```

## Sécurité

- Conformité RGPD
- Certification ISO 27001
- Validation académique
- Chiffrement des données

## Statistiques

- 15,000+ textes analysés
- 500+ chercheurs actifs
- 25+ universités partenaires
- 98% satisfaction utilisateur

## Partenariats

- Université Sorbonne Nouvelle
- CNRS - Centre National de la Recherche
- Université d'Alger 2
- Laboratoire LAIRID - Université Mohamed Khider De Biskra

## Support

- **Email**: support@emoletr.com
- **Forum**: Communauté d'entraide
- **Téléphone**: Support dédié (forfait Institutionnel)

## Licence

© 2025 EmoLetr Platform. Tous droits réservés.

## Crédits

Développé par le laboratoire LAIRID de l'Université Mohamed Khider De Biskra, Algérie.

---



