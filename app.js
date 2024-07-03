function attachEvents() {
  const URL = "http://localhost:3030/jsonstore/messenger";
  document.getElementById("submit").addEventListener("click", onSubmit);
  document.getElementById("refresh").addEventListener("click", onload);
  const textAreaRef = document.getElementById("messages");

  const authorRef = document.querySelector("input[name='author']");
  const contentRef = document.querySelector("input[name='content']");

  async function onload(e) {
    e.preventDefault();
    const response = await fetch(URL);
    const data = await response.json();

    let buff = "";
    Object.values(data).forEach((x) => {
      buff += `${x.author}: ${x.content}\n`;
    });

    textAreaRef.value = buff.trim();
  }

  async function onSubmit(e) {
    e.preventDefault();

    const author = authorRef.value;
    const content = contentRef.value;

    if(author == "" || content == ""){
        return;
    }

    const option = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ author, content }),
    }
    await fetch(URL,option)
    authorRef.value = "";
    contentRef.value = "";

    onload(e);
    
  }
}

attachEvents();
