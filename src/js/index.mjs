// 「追加」ボタンがクリックされたときの処理
const onClickAdd = () => {
  // 入力フィールドからテキストを取得
  const inputText = document.getElementById("add-text").value;
  // 入力フィールドを空にする
  document.getElementById("add-text").value = "";
  // 取得したテキストで未完了TODOリストに新しいアイテムを作成
  createIncompleteTodo(inputText);
};

// 削除ボタンがクリックされたときの処理
const onClickDeleteButton = (deleteButton) => {
  // クリックされた削除ボタンの最も近い親のli要素を特定
  const deleteTarget = deleteButton.closest("li");
  // 未完了リストから対象の要素を削除
  document.getElementById("incomplete-list").removeChild(deleteTarget);
};

// 完了ボタンがクリックされたときの処理
const onClickCompleteButton = (completeButton) => {
  // クリックされた完了ボタンの最も近い親のli要素を特定
  const moveTarget = completeButton.closest("li");
  // 削除ボタンを削除
  completeButton.nextElementSibling.remove();
  // 完了ボタン自体を削除
  completeButton.remove();

  // 「戻す」ボタンを新規作成
  const backButton = document.createElement("button");
  backButton.innerText = "戻す";
  // 「戻す」ボタンをli要素の最初の子要素に追加
  moveTarget.firstElementChild.appendChild(backButton);

  // 完了したTODOリストに移動
  document.getElementById("complete-list").appendChild(moveTarget);

  // 「戻す」ボタンにクリックイベントを追加
  backButton.addEventListener("click", () => {
    // TODOのテキストを取得
    const todoText = backButton.previousElementSibling.innerText;
    // 未完了TODOリストに戻す
    createIncompleteTodo(todoText);
    // 完了リストから削除
    backButton.closest("li").remove();
  });
};

// 未完了TODOリストに新しいTODOアイテムを作成する関数
const createIncompleteTodo = (todo) => {
  // 新しいli要素を作成
  const li = document.createElement("li");

  // リスト内の行を表すdiv要素を作成
  const div = document.createElement("div");
  div.className = "list-row";

  // TODOのテキストを表示するp要素を作成
  const p = document.createElement("p");
  p.className = "todo-item";
  p.innerText = todo;

  // 完了ボタンと削除ボタンを作成
  const completeButton = document.createElement("button");
  const deleteButton = document.createElement("button");
  completeButton.innerText = "完了";
  deleteButton.innerText = "削除";

  // ボタンにクリックイベントリスナーを追加
  completeButton.addEventListener("click", () =>
    onClickCompleteButton(completeButton)
  );
  deleteButton.addEventListener("click", () =>
    onClickDeleteButton(deleteButton)
  );

  // 要素を階層的に追加
  div.appendChild(p);
  div.appendChild(completeButton);
  div.appendChild(deleteButton);
  li.appendChild(div);

  // 未完了リストに新しいアイテムを追加
  const ul = document.getElementById("incomplete-list");
  ul.appendChild(li);
};

// 「追加」ボタンにクリックイベントリスナーを追加
document.getElementById("add-button").addEventListener("click", onClickAdd);
