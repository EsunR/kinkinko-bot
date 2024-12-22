import { UniMsgEvent } from "@/types/message"
import { OnebotMessageArray } from "@kinkinko/onebot-sdk"
import { DataTypes, Model, Optional, Sequelize } from "sequelize"

export interface GroupChatAttributes {
    id: number
    userId: number
    userName: string
    /** 纯文本内容 */
    textContent?: string
    /** 图片内容 */
    imageContent?: string
    /** 回复消息的 id */
    replyMsgId?: number
    /** 以 onebot 协议的数据格式存放完整的消息数据 */
    msgArray: UniMsgEvent["msgArray"]
    /** 原始内容 */
    msgRaw: string
    createdAt: string
}

export interface GroupChatCreationAttributes
    extends Optional<
        GroupChatAttributes,
        "createdAt" | "textContent" | "imageContent" | "replyMsgId"
    > {}

export interface GroupChatInstance
    extends Model<GroupChatAttributes, GroupChatCreationAttributes>,
        GroupChatAttributes {}

export function createGroupChatModel(sequelize: Sequelize, tableId: string) {
    const ChatModel = sequelize.define<GroupChatInstance>(
        `GroupChat_${tableId}`,
        {
            id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
            },
            userId: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },
            userName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            textContent: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            imageContent: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            replyMsgId: {
                type: DataTypes.BIGINT,
                allowNull: true,
            },
            msgArray: {
                type: DataTypes.JSON,
                allowNull: false,
            },
            msgRaw: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            createdAt: {
                type: DataTypes.DATE,
            },
        },
    )

    return ChatModel
}
