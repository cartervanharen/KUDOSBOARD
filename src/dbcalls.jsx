import axios from "axios";

const fetchAllUsers = async () => {
  try {
    const response = await axios.get("http://localhost:3001/users");
    console.log("All users:", response.data);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

const addUser = async (name) => {
  try {
    const response = await axios.post("http://localhost:3001/users", { name });
    console.log("User added:", response.data);
  } catch (error) {
    console.error("Error adding user:", error);
  }
};

const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(
      `http://localhost:3001/users/${userId}`
    );
    console.log("User deleted successfully:", response.data);
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};

const deleteCard = async (cardId) => {
  try {
    const response = await axios.delete(
      `http://localhost:3001/cards/${cardId}`
    );
    console.log("Card deleted successfully:", response.data);
  } catch (error) {
    console.error("Error deleting card:", error);
  }
};

const deleteBoard = async (boardId) => {
  try {
    const response = await axios.delete(
      `http://localhost:3001/boards/${boardId}`
    );
    console.log("Board deleted successfully:", response.data);
  } catch (error) {
    console.error("Error deleting board:", error);
  }
};

const addCard = async (userId, boardId, cardtitle, carddescription, image) => {
  try {
    const response = await axios.post("http://localhost:3001/cards", {
      userId,
      boardId,
      cardtitle,
      carddescription,
      image,
    });
    console.log("Card added:", response.data);
  } catch (error) {
    console.error("Error adding card:", error);
  }
};

const addBoard = async (type, title, image, userId) => {
  try {
    const response = await axios.post("http://localhost:3001/boards", {
      type,
      title,
      image,
      userId,
    });
    console.log("Board added:", response.data);
  } catch (error) {
    console.error("Error adding board:", error);
  }
};

const getUserIdFromCardId = async (cardId) => {
  try {
    const response = await axios.get(`http://localhost:3001/cards/${cardId}`);
    const userId = response.data.userId;
    console.log("User ID from Card ID:", userId);
    return userId;
  } catch (error) {
    console.error("Error fetching user ID from card ID:", error);
  }
};

const getUserFromBoardId = async (boardId) => {
  try {
    const response = await axios.get(`http://localhost:3001/boards/${boardId}`);
    const userId = response.data.userId;
    const userResponse = await axios.get(
      `http://localhost:3001/users/${userId}`
    );
    console.log("User from Board ID:", userResponse.data);
    return userResponse.data;
  } catch (error) {
    console.error("Error fetching user from board ID:", error);
  }
};

const getBoardsFromUserId = async (userId) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/users/${userId}/boards`
    );
    console.log("Boards from User ID:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching boards from user ID:", error);
  }
};
const getCardsFromUserId = async (userId) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/users/${userId}/cards`
    );
    console.log("Cards from User ID:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching cards from user ID:", error);
  }
};

const fetchAllCards = async () => {
  try {
    const response = await axios.get("http://localhost:3001/cards");
    console.log("All Cards:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching all cards:", error);
  }
};

const fetchAllBoards = async () => {
  try {
    const response = await axios.get("http://localhost:3001/boards");
    console.log("All Boards:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching all boards:", error);
  }
};

export {
  fetchAllCards,
  fetchAllBoards,
  fetchAllUsers,
  addUser,
  deleteUser,
  deleteCard,
  deleteBoard,
  addCard,
  addBoard,
  getUserIdFromCardId,
  getBoardsFromUserId,
  getUserFromBoardId,
  getCardsFromUserId,
};
