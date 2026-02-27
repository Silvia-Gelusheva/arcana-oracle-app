import { ref as dbRef, getDatabase, set } from "firebase/database";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import fs from "fs";
import { initializeApp } from "firebase/app";

const firebaseConfig = {

    apiKey: "AIzaSyD8pBTyTHwGtLR0xnz0Zw5eHdb_mwznZN8",

    authDomain: "arcana-oracle-app.firebaseapp.com",

    databaseURL: "https://arcana-oracle-app-default-rtdb.europe-west1.firebasedatabase.app",

    projectId: "arcana-oracle-app",

    storageBucket: "arcana-oracle-app.firebasestorage.app",

    messagingSenderId: "638294467382",

    appId: "1:638294467382:web:1f8db3ee699ff4ac04c997"

};



const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getDatabase(app);

// -------------------- PRODUCTS --------------------

const products = [
    // Books
    {
        id: "1",
        title: "Tarot Book 1",
        localImage: "./assets/products/book1.png",
        price: 10,
        prod_description: "A mystical guidebook for tarot enthusiasts, filled with insights for spiritual growth and divination practices."
    },
    {
        id: "2",
        title: "Tarot Book 2",
        localImage: "./assets/products/book2.png",
        price: 12,
        prod_description: "An oracle-inspired book to enhance intuition, mindfulness, and magical rituals."
    },
    {
        id: "3",
        title: "Tarot Book 3",
        localImage: "./assets/products/book3.png",
        price: 15,
        prod_description: "A beautifully illustrated guide for exploring crystal energies, meditation, and mystical wisdom."
    },
    {
        id: "4",
        title: "Tarot Book 4",
        localImage: "./assets/products/book4.png",
        price: 18,
        prod_description: "A detailed handbook for spiritual practices, tarot reading techniques, and arcane symbolism."
    },
    {
        id: "5",
        title: "Tarot Book 5",
        localImage: "./assets/products/book5.png",
        price: 20,
        prod_description: "A celestial journal and guidebook for manifesting intentions, moon tracking, and self-reflection."
    },

    // Decks
    {
        id: "6",
        title: "Tarot Deck 1",
        localImage: "./assets/products/deck1.png",
        price: 25,
        prod_description: "A mystical tarot deck designed for intuitive readings and spiritual guidance."
    },
    {
        id: "7",
        title: "Tarot Deck 2",
        localImage: "./assets/products/deck2.png",
        price: 30,
        prod_description: "Elegant oracle cards crafted to unlock inner wisdom and deliver daily messages."
    },
    {
        id: "8",
        title: "Tarot Deck 3",
        localImage: "./assets/products/deck3.png",
        price: 28,
        prod_description: "A vibrant deck for meditation, energy work, and enhancing divination rituals."
    },
    {
        id: "9",
        title: "Oracle Deck 4",
        localImage: "./assets/products/deck4.png",
        price: 35,
        prod_description: "A beautifully illustrated oracle deck perfect for insight, clarity, and spiritual connection."
    },
    {
        id: "10",
        title: "Oracle Deck 5",
        localImage: "./assets/products/deck5.png",
        price: 40,
        prod_description: "A celestial oracle deck for manifestation, personal reflection, and mystical exploration."
    },
];

const cards = [
    {
        id: "0",
        name: "The Fool",
        localImage: "./assets/cards/0.png",
        meaning: "New beginnings, innocence, spontaneity, free spirit",
        card_description:
            "Step into the unknown with a twinkle in your eye. Adventure calls and curiosity leads the way. Mistakes are playful teachers here, guiding you to laugh at life. When you draw The Fool, try taking a small risk today, follow your intuition, and embrace the surprises along the way.",
    },
    {
        id: "1",
        name: "The Magician",
        localImage: "./assets/cards/1.png",
        meaning: "Manifestation, resourcefulness, power, inspired action",
        card_description:
            "Magic is in your hands. What you imagine, you can create. Focus your energy and turn ideas into reality. Practically, use your skills and resources wisely today, set clear intentions, and take one inspired action toward your goal.",
    },
    {
        id: "2",
        name: "The High Priestess",
        localImage: "./assets/cards/2.png",
        meaning: "Intuition, sacred knowledge, inner voice",
        card_description:
            "Trust your intuition; the answers lie within. Silence often reveals more than noise ever could. Take time to meditate or journal today, notice your dreams, and allow your inner wisdom to guide important decisions.",
    },
    {
        id: "3",
        name: "The Empress",
        localImage: "./assets/cards/3.png",
        meaning: "Femininity, beauty, nurturing, abundance",
        card_description:
            "Creation flows through you. Nurture what you love and abundance will blossom naturally. Today, care for yourself and others, spend time in nature, and notice small moments of beauty and growth around you.",
    },
    {
        id: "4",
        name: "The Emperor",
        localImage: "./assets/cards/4.png",
        meaning: "Authority, structure, stability, leadership",
        card_description:
            "Stand firm in your power. Structure brings strength and leadership requires responsibility. Focus on organizing your environment or planning long-term goals. Take practical steps to establish stability and lead by example.",
    },
    {
        id: "5",
        name: "The Hierophant",
        localImage: "./assets/cards/5.png",
        meaning: "Tradition, spiritual wisdom, guidance",
        card_description:
            "Seek wisdom from tradition and mentors. There is value in shared knowledge. Today, consider consulting a teacher, following established methods, or honoring rituals that give you a sense of grounding.",
    },
    {
        id: "6",
        name: "The Lovers",
        localImage: "./assets/cards/6.png",
        meaning: "Love, harmony, relationships, choices",
        card_description:
            "Matters of the heart are highlighted. Choose with alignment and authenticity. Focus on connection and communication with loved ones. Reflect on important choices, ensuring they align with your values.",
    },
    {
        id: "7",
        name: "The Chariot",
        localImage: "./assets/cards/7.png",
        meaning: "Willpower, determination, victory",
        card_description:
            "Drive forward with confidence. Control your direction and success follows. Today, stay focused on your goals, overcome obstacles, and use discipline to steer your efforts toward tangible results.",
    },
    {
        id: "8",
        name: "Strength",
        localImage: "./assets/cards/8.png",
        meaning: "Courage, patience, compassion",
        card_description:
            "True strength lies in gentle control. Courage mixed with compassion conquers all. Face challenges calmly, practice patience with yourself and others, and approach difficult situations with kindness and courage.",
    },
    {
        id: "9",
        name: "The Hermit",
        localImage: "./assets/cards/9.png",
        meaning: "Introspection, solitude, inner guidance",
        card_description:
            "Step back and reflect. Inner wisdom shines brightest in quiet moments. Take time to meditate or journal today, withdraw from distractions, and seek answers by looking within rather than externally.",
    },
    {
        id: "10",
        name: "Wheel of Fortune",
        localImage: "./assets/cards/10.png",
        meaning: "Cycles, change, destiny, luck",
        card_description:
            "Life moves in cycles. Embrace change and trust the turning of fate. Pay attention to new opportunities, be flexible, and act in alignment with the timing of events to maximize positive outcomes.",
    },
    {
        id: "11",
        name: "Justice",
        localImage: "./assets/cards/11.png",
        meaning: "Truth, fairness, accountability",
        card_description:
            "Balance and truth guide you. Actions have consequences—act with integrity. Evaluate situations objectively, make fair decisions, and own your choices responsibly today.",
    },
    {
        id: "12",
        name: "The Hanged Man",
        localImage: "./assets/cards/12.png",
        meaning: "Pause, surrender, new perspective",
        card_description:
            "Let go and see things differently. A shift in perspective changes everything. Take a break from trying to control outcomes, observe situations from a new angle, and allow insight to come before acting.",
    },
    {
        id: "13",
        name: "Death",
        localImage: "./assets/cards/13.png",
        meaning: "Transformation, endings, rebirth",
        card_description:
            "An ending clears space for transformation. Rebirth follows release. Embrace change, let go of what no longer serves you, and focus on new beginnings that lead to growth.",
    },
    {
        id: "14",
        name: "Temperance",
        localImage: "./assets/cards/14.png",
        meaning: "Balance, moderation, harmony",
        card_description:
            "Find balance in all things. Harmony arises from patience and moderation. Combine different aspects of your life thoughtfully, practice self-restraint, and nurture emotional equilibrium today.",
    },
    {
        id: "15",
        name: "The Devil",
        localImage: "./assets/cards/15.png",
        meaning: "Attachment, temptation, limitation",
        card_description:
            "Recognize what binds you. Awareness is the first step toward freedom. Reflect on habits or attachments that limit you, and take small steps to regain control and personal power.",
    },
    {
        id: "16",
        name: "The Tower",
        localImage: "./assets/cards/16.png",
        meaning: "Sudden change, upheaval, revelation",
        card_description:
            "Unexpected shifts break illusions. Though chaotic, truth sets you free. Accept sudden changes, reassess priorities, and be open to rebuilding stronger foundations from disruption.",
    },
    {
        id: "17",
        name: "The Star",
        localImage: "./assets/cards/17.png",
        meaning: "Hope, renewal, inspiration",
        card_description:
            "Hope returns. Trust the light that guides you forward. Focus on healing, setting positive intentions, and finding inspiration in both small and large moments today.",
    },
    {
        id: "18",
        name: "The Moon",
        localImage: "./assets/cards/18.png",
        meaning: "Illusion, fear, intuition",
        card_description:
            "Not everything is as it seems. Trust intuition over illusion. Pay attention to dreams and subtle signals, question assumptions, and navigate uncertainty with care.",
    },
    {
        id: "19",
        name: "The Sun",
        localImage: "./assets/cards/19.png",
        meaning: "Joy, success, vitality",
        card_description:
            "Clarity and joy shine brightly. Celebrate your success openly. Engage in activities that bring happiness, express gratitude, and share positivity with others today.",
    },
    {
        id: "20",
        name: "Judgement",
        localImage: "./assets/cards/20.png",
        meaning: "Awakening, reflection, reckoning",
        card_description:
            "A call to rise higher. Reflect and step into your true purpose. Reevaluate past actions, forgive yourself and others, and make choices aligned with your higher self.",
    },
    {
        id: "21",
        name: "The World",
        localImage: "./assets/cards/21.png",
        meaning: "Completion, accomplishment, fulfillment",
        card_description:
            "A cycle completes. Celebrate growth and integration. Take pride in achievements, acknowledge lessons learned, and prepare to begin the next journey with confidence.",
    },
];
//-------------------- UPLOAD FUNCTION --------------------
async function uploadProducts() {
    for (const product of products) {
        try {
            // 1. Upload image to Firebase Storage
            const data = fs.readFileSync(product.localImage);
            const storageRef = ref(storage, `products/${product.id}.jpg`);
            await uploadBytes(storageRef, data);
            const url = await getDownloadURL(storageRef);

            // 2. Save product in Realtime Database
            await set(dbRef(db, `products/${product.id}`), {
                id: product.id,
                title: product.title,
                price: product.price,
                prod_description: product.prod_description,
                image: url,
            });

            console.log(`${product.title} uploaded! URL: ${url}`);
        } catch (err) {
            console.error(`Failed to upload ${product.title}:`, err.message);
        }
    }

    console.log("All products uploaded to Storage and Realtime Database!");
}

// -------------------- RUN --------------------
uploadProducts();

// -------------------- UPLOAD FUNCTION FOR CARDS --------------------
async function uploadCards() {
    for (const card of cards) {
        try {
            // 1. Upload image to Firebase Storage
            const data = fs.readFileSync(card.localImage);
            const storageRef = ref(storage, `cards/${card.id}.png`);
            await uploadBytes(storageRef, data);
            const url = await getDownloadURL(storageRef);

            // 2. Save card in Realtime Database
            await set(dbRef(db, `cards/${card.id}`), {
                id: card.id,
                name: card.name,
                meaning: card.meaning,
                card_description: card.card_description,
                image: url,
            });

            console.log(`Card "${card.name}" uploaded! URL: ${url}`);
        } catch (err) {
            console.error(`Failed to upload card "${card.name}":`, err.message);
        }
    }

    console.log("All cards uploaded to Storage and Realtime Database!");
}
// -------------------- RUN --------------------

uploadCards();