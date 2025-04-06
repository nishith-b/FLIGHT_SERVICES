const { where } = require("sequelize");
const { Logger } = require("../config");
const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");

class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      const response = await this.model.create(data);
      return response;
    } catch (error) {
      if (error.name === "TypeError") {
        throw new AppError(
          "Cannot create a new Airplane object",
          StatusCodes.INTERNAL_SERVER_ERROR
        );
      }
      throw error;
    }
  }

  async destory(data) {
    try {
      const response = await this.model.destory({ where: { id: data } });
      return response;
    } catch (error) {
      Logger.error("something went wrong in the crud repo:destroy");
      throw error;
    }
  }

  async get(data) {
    try {
      const response = await this.model.findByPk(data);
      return response;
    } catch (error) {
      Logger.error("something went wrong in the crud repo:get");
      throw error;
    }
  }

  async getAll() {
    try {
      const response = await this.model.findAll();
      return response;
    } catch (error) {
      Logger.error("something went wrong in the crud repo:getAll");
      throw error;
    }
  }

  async update(id, data) {
    try {
      const response = await this.model.update(data, {
        where: { id: id },
      });
      return response;
    } catch (error) {
      Logger.error("something went wrong in the crud repo:create");
      throw error;
    }
  }
}

module.exports = CrudRepository;
