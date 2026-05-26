import React, { useState, useEffect } from "react";
import { db } from "./firebase";
// 💡 [과제 2] Firestore 도구들을 가져오세요.
// (힌트: collection, addDoc, query, orderBy, onSnapshot, serverTimestamp)
/* 💡 [여기에 import 코드를 작성하세요] */
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

function App() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  // 💡 [과제 3] 실시간 읽기 로직 (onSnapshot 활용)
  useEffect(() => {
    // 1. query를 이용해 "guestbook" 컬렉션의 데이터를 시간순(desc)으로 정렬하는 쿼리를 생성하세요.
    /* 💡 [여기에 코드를 작성하세요] */
    const q = query(collection(db, "guestbook"), orderBy("createdAt", "desc"));

    // 2. onSnapshot을 사용하여 데이터가 바뀔 때마다 실시간으로 업데이트하세요.
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // 3. 가져온 data를 상태(setMessages)에 저장하세요.
      /* 💡 [여기에 코드를 작성하세요] */
      setMessages(data);
    });

    // 4. 클린업 함수: 감시(onSnapshot)를 중단하도록 리턴하세요.
    /* 💡 [여기에 코드를 작성하세요] */
    return () => unsubscribe();
  }, []);

  // 💡 [과제 4] 데이터 쓰기 로직 (addDoc 활용)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text.trim() === "") return;

    // "guestbook" 컬렉션에 { content: text, createdAt: serverTimestamp() } 저장하기
    /* 💡 [여기에 코드를 작성하세요] */
    await addDoc(collection(db, "guestbook"), {
      content: text,
      createdAt: serverTimestamp(),
    });

    setText("");
  };

  // 💡 [추가 과제 1] 데이터 삭제 (Delete)
  const handleDelete = async (id) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      // 과제: deleteDoc과 doc 함수를 사용하여 특정 문서를 삭제하세요.
      // [힌트: await deleteDoc(doc(db, "컬렉션명", id));]

      /* 💡 [여기에 삭제 코드를 작성하세요] */
      await deleteDoc(doc(db, "guestbook", id));
    }
  };

  // 💡 [추가 과제 2] 데이터 수정 (Update)
  const handleEdit = async (id, currentText) => {
    const newText = prompt("수정할 내용을 입력하세요", currentText);
    if (newText && newText.trim() !== "" && newText !== currentText) {
      // 과제: updateDoc과 doc 함수를 사용하여 특정 문서의 content를 수정하세요.
      // [힌트: await updateDoc(doc(db, "컬렉션명", id), { 필드: 값 });]

      /* 💡 [여기에 수정 코드를 작성하세요] */
      await updateDoc(doc(db, "guestbook", id), {
        content: newText,
      });
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>한 줄 방명록</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          style={styles.input}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="따뜻한 한마디를 남겨주세요"
        />
        <button type="submit" style={styles.button}>
          등록
        </button>
      </form>

      <ul style={styles.list}>
        {/* 💡 [과제 5] map 함수를 이용해 messages 리스트를 화면에 뿌려주세요. */}
        {/* 힌트: <li key={msg.id} style={styles.listItem}> ... </li> */}

        {/* 💡 [여기에 코드를 작성하세요] */}
        {messages.map((msg) => (
          <li key={msg.id} style={styles.listItem}>
            <div style={styles.contentBox}>
              <span style={styles.msgText}>{msg.content}</span>

              <span style={styles.date}>
                {msg.createdAt?.toDate
                  ? msg.createdAt.toDate().toLocaleString()
                  : "방금 전"}
              </span>
            </div>

            <div style={styles.btnGroup}>
              <button
                style={styles.editBtn}
                onClick={() => handleEdit(msg.id, msg.content)}
              >
                수정
              </button>

              <button
                style={styles.deleteBtn}
                onClick={() => handleDelete(msg.id)}
              >
                삭제
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// 스타일 예시입니다.
const styles = {
  container: {
    padding: "40px 20px",
    maxWidth: "600px",
    margin: "0 auto",
    fontFamily: "'Pretendard', sans-serif",
  },
  title: { textAlign: "center", marginBottom: "30px", color: "#2c3e50" },
  form: { display: "flex", gap: "10px", marginBottom: "30px" },
  input: {
    flex: 1,
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "1rem",
  },
  button: {
    padding: "12px 24px",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  list: { listStyle: "none", padding: 0 },
  listItem: {
    padding: "15px 20px",
    backgroundColor: "white",
    border: "1px solid #eee",
    marginBottom: "12px",
    borderRadius: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  },
  contentBox: { display: "flex", flexDirection: "column", gap: "5px" },
  msgText: { fontSize: "1.05rem", color: "#34495e" },
  date: { color: "#95a5a6", fontSize: "0.75rem" },
  btnGroup: { display: "flex", gap: "8px" },
  editBtn: {
    padding: "6px 12px",
    backgroundColor: "#f1c40f",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "0.8rem",
  },
  deleteBtn: {
    padding: "6px 12px",
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "0.8rem",
  },
};

export default App;
