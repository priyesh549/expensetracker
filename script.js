document.addEventListener("DOMContentLoaded", function () {
  const expenseAmountInput = document.getElementById("expenseAmount");
  const expenseDescriptionInput = document.getElementById("expenseDescription");
  const categoryDropdown = document.getElementById("categoryDropdown");
  const submitButton = document.getElementById("submit");
  const itemList = document.getElementById("itemList");

  submitButton.addEventListener("click", function () {
    const amount = expenseAmountInput.value;
    const description = expenseDescriptionInput.value;
    const category = categoryDropdown.value;

    const listItem = createListItem(amount, description, category);
    itemList.appendChild(listItem);

    saveInLocalStorage(amount, description, category);

    expenseAmountInput.value = "";
    expenseDescriptionInput.value = "";
  });

  function createListItem(amount, description, category) {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
        Expense: ${amount}, Description: ${description}, Category: ${category}
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
    `;

    const editButton = listItem.querySelector(".edit");
    const deleteButton = listItem.querySelector(".delete");

    editButton.addEventListener("click", function () {
      if (
        expenseAmountInput.value != "" ||
        expenseDescriptionInput.value != ""
      ) {
        alert("cannot update since you already have an entry filled");
        return;
      }
      itemList.removeChild(listItem);
      deleteFromLocalStorage(amount,description,category);
      expenseAmountInput.value = amount;
      expenseDescriptionInput.value = description;
      categoryDropdown.value = category;
      console.log("Edit button clicked for:", amount, description, category);
    });

    deleteButton.addEventListener("click", function () {
      itemList.removeChild(listItem);

      deleteFromLocalStorage(amount,description,category);
    });
    return listItem;
  }

  function saveInLocalStorage(amount, description, category) {
    const data = {
      Expense: amount,
      Description: description,
      Category: category,
    };

    const lsItemList = JSON.parse(localStorage.getItem("expenses")) || [];
    lsItemList.push(data);
    localStorage.setItem("expenses", JSON.stringify(lsItemList));
  }

  function deleteFromLocalStorage(amount, description, category) {
    const lsItemList = JSON.parse(localStorage.getItem('expenses')) || [];
    const index = lsItemList.findIndex(item => (
      item.Expense === amount &&
      item.Description === description
    ));

    if (index !== -1) {
        lsItemList.splice(index, 1);
        localStorage.setItem('expenses', JSON.stringify(lsItemList));
      }
  }
});
