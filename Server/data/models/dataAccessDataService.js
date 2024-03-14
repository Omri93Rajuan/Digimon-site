const fs = require("fs");
const data = fs.readFileSync("./data.json");


const getAllData = () => {
    try {
        return JSON.parse(data);
    } catch (error) {
        console.log("Error reading data from JSON:", error);
        return [];
    }
};

const getData = async (id) => {
    if (!id) {
      throw new Error("Missing id parameter");
    }
    try {
      const data = await getAllData();
      const newData = data.filter((item) => item.id === id)[0]; // לקיחת הפריט הראשון בלבד
      if (!newData) {
        throw new Error("Could not find this card in the database");
      }
      return Promise.resolve(newData);
    } catch (error) {
      error.status = 404;
      throw error;
    }
  };

const createData = async (newData) => {
    try {
        const currentData = await getAllData();
        currentData.push(newData);
        fs.writeFileSync("./data.json", JSON.stringify(currentData));
        return Promise.resolve("Data created successfully");
    } catch (error) {
        throw error;
    }
};
const deleteData = async (id) => {
    try {
        const currentData = await getAllData();
        const index = currentData.findIndex((item) => item.id === id);
        if (index === -1) {
            throw new Error("Could not find this card in the database");
        }
        const deletedData = currentData.splice(index, 1)[0];
        fs.writeFileSync("./data.json", JSON.stringify(currentData));
        return Promise.resolve(deletedData);
    } catch (error) {
        error.status = 404;
        throw error;
    }
};

const updateData = async (id, updatedData) => {
    try {
        const currentData = await getData();
        const index = currentData.findIndex((item) => item.id === id);
        if (index === -1) {
            throw new Error("Could not find this card in the database");
        }
        currentData[index] = { ...currentData[index], ...updatedData };
        fs.writeFileSync("./data.json", JSON.stringify(currentData));
        return Promise.resolve(currentData[index]);
    } catch (error) {
        error.status = 404;
        throw error;
    }
};

module.exports = {
    getAllData,
    getData,
    createData,
    deleteData,
    updateData
};