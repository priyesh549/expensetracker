document.addEventListener("DOMContentLoaded", function () {
  const expenseAmountInput = document.getElementById("expenseAmount");
  const expenseDescriptionInput = document.getElementById("expenseDescription");
  const categoryDropdown = document.getElementById("categoryDropdown");
  const submitButton = document.getElementById("submit");
  const itemList = document.getElementById("itemList");
  const items = [];

  axios
    .get(
      "https://crudcrud.com/api/896fc3a2eb364018af2dd438089bf9f8/appointment"
    )
    .then((res) => {
      res.data.forEach((r) => {
        items.push(r);
        const listItem = createListItem(r.ExpenseAmount, r.ItemDescription, r.ItemCategory);
        itemList.appendChild(listItem);
      });
    })
    .catch((err) => console.log(err));

  submitButton.addEventListener("click", function () {
    const amount = expenseAmountInput.value;
    const description = expenseDescriptionInput.value;
    const category = categoryDropdown.value;

    const listItem = createListItem(amount, description, category);
    itemList.appendChild(listItem);

    saveInCrudCrud(amount, description, category,listItem);

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
        alert("Cannot update since you already have an entry filled");
        return;
      }
      const itemId = listItem.getAttribute("data-item-id");
      itemList.removeChild(listItem);
      deleteFromCrudCrud(itemId);
      expenseAmountInput.value = amount;
      expenseDescriptionInput.value = description;
      categoryDropdown.value = category;
      console.log("Edit button clicked for:", amount, description, category);
    });

    deleteButton.addEventListener("click", function () {
      const itemId = listItem.getAttribute("data-item-id");
      itemList.removeChild(listItem);
      deleteFromCrudCrud(itemId);
    });    

    return listItem;
  }

  function saveInCrudCrud(amount, description, category,listItem) {
    axios
      .post(
        "https://crudcrud.com/api/896fc3a2eb364018af2dd438089bf9f8/appointment",
        {
          ExpenseAmount: amount,
          ItemDescription: description,
          ItemCategory: category,
        }
      )
      .then((res) => {
        listItem.setAttribute("data-item-id",res.data._id)
        console.log(res)
      })
      .catch((err) => console.log(err));


  }

  function deleteFromCrudCrud(itemId){
    axios.delete(`https://crudcrud.com/api/896fc3a2eb364018af2dd438089bf9f8/appointment/${itemId}`)
    .then(res=>console.log(res))
    .catch(err=>console.log(err))
  }
});
