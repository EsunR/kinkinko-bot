import { serverConfig } from "@/utils/config"
import { Sequelize } from "sequelize"

export const sequelize = new Sequelize({
    dialect: "mysql",
    define: {
        freezeTableName: true,
    },
    ...serverConfig.db,
})
