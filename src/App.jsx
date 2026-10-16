import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(
        collection(db, "messages"),
        orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
      );
    });

    return unsubscribe;
  }, []);

  async function sendMessage(e) {
    e.preventDefault();

    if (!name.trim() || !message.trim()) return;

    try {
      await addDoc(collection(db, "messages"), {
        name: name.trim(),
        text: message.trim(),
        createdAt: serverTimestamp(),
      });

      setMessage("");
    } catch (error) {
      console.error("Помилка надсилання:", error);
      alert("Не вдалося надіслати повідомлення. Перевір налаштування Firebase.");
    }
  }

  return (
      <main className="chat">
        <h1>React Chat</h1>
        <p className="subtitle">Чат на Firebase Firestore</p>

        <label htmlFor="name">Твоє ім'я</label>
        <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Введи ім'я"
            maxLength={40}
        />

        <section className="messages">
          {messages.map((msg) => (
              <article className="message" key={msg.id}>
                <strong>{msg.name}</strong>
                <p>{msg.text}</p>
              </article>
          ))}
        </section>

        <form onSubmit={sendMessage}>
          <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Напиши повідомлення..."
              maxLength={1000}
          />
          <button type="submit">Надіслати</button>
        </form>
      </main>
  );
}

export default App;