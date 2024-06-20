import axios from "axios";

const fetchAllUsers = async () => {
  try {
    const response = await axios.get("http://localhost:3001/users");
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

const addUser = async (name) => {
  try {
    const response = await axios.post("http://localhost:3001/users", { name });
  } catch (error) {
    console.error("Error adding user:", error);
  }
};

const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(
      `http://localhost:3001/users/${userId}`
    );
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};

const deleteCard = async (cardId) => {
  try {
    const response = await axios.delete(
      `http://localhost:3001/cards/${cardId}`
    );
  } catch (error) {
    console.error("Error deleting card:", error);
  }
};

const deleteBoard = async (boardId) => {
  try {
    const response = await axios.delete(
      `http://localhost:3001/boards/${boardId}`
    );
  } catch (error) {
    console.error("Error deleting board:", error);
  }
};

const addCard = async (
  userId,
  boardId,
  cardtitle,
  carddescription,
  image,
  likes
) => {
  try {
    const response = await axios.post("http://localhost:3001/cards", {
      userId,
      boardId,
      cardtitle,
      carddescription,
      image,
      likes,
    });
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
  } catch (error) {
    console.error("Error adding board:", error);
  }
};

const getUserIdFromCardId = async (cardId) => {
  try {
    const response = await axios.get(`http://localhost:3001/cards/${cardId}`);
    const userId = response.data.userId;
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
    return response.data;
  } catch (error) {
    console.error("Error fetching cards from user ID:", error);
  }
};

const fetchAllCards = async () => {
  try {
    const response = await axios.get("http://localhost:3001/cards");
    return response.data;
  } catch (error) {
    console.error("Error fetching all cards:", error);
  }
};

const fetchAllBoards = async () => {
  try {
    const response = await axios.get("http://localhost:3001/boards");
    return response.data;
  } catch (error) {
    console.error("Error fetching all boards:", error);
  }
};

const getCardsFromBoardId = async (boardId) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/boards/${boardId}/cards`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching cards from board ID:", error);
    return []; 
  }
};

const deleteAllCardsFromBoard = async (boardId) => {
  try {
    const response = await axios.delete(
      `http://localhost:3001/boards/${boardId}/cards`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting all cards from board ID:", error);
    return null;
  }
};

export {
  fetchAllCards,
  fetchAllBoards,
  deleteAllCardsFromBoard,
  getCardsFromBoardId,
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
