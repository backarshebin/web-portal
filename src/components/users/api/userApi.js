// A mock function to mimic making an async request for data
const baseUrl = "https://localhost:7082/api";
export function fetchCount(amount = 1) {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: amount }), 500)
  );
}

export function fetchUsers({
  searchTerm = "",
  searchAll = false,
  currentPage = 1,
  limit = 50,
}) {
  return new Promise((resolve, reject) => {
    let offset = limit * (currentPage - 1);
    setTimeout(() => {
      fetch(
        `${baseUrl}/users?search=${searchTerm}&searchAll=${searchAll}&offset=${offset}&limit=${limit}`
      )
        .then((response) => {
          resolve(response.json());
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    }, 2000);
  });
}

export function updateUser(userToSave) {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("FirstName", userToSave.first_name);
    formData.append("LastName", userToSave.last_name);
    formData.append("Email", userToSave.email);
    formData.append("Status", userToSave.status);
    formData.append("Gender", userToSave.gender);
    setTimeout(() => {
      fetch(`${baseUrl}/users/${userToSave.id}`, {
        method: "PUT",
        mode: "cors",
        cache: "no-cache",

        body: formData,
      })
        .then((response) => {
          resolve(response.json());
        })

        .catch((error) => {
          console.error(error);
          reject(error);
        });
    }, 2000);
  });
}

export function createUser(userToSave) {
  const formData = new FormData();
  formData.append("FirstName", userToSave.first_name);
  formData.append("LastName", userToSave.last_name);
  formData.append("Email", userToSave.email);
  formData.append("Status", userToSave.status);
  formData.append("Gender", userToSave.gender);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch(`${baseUrl}/users`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",

        body: formData,
      })
        .then((response) => {
          resolve(response.json());
        })

        .catch((error) => {
          console.error(error);
          reject(error);
        });
    }, 2000);
  });
}
