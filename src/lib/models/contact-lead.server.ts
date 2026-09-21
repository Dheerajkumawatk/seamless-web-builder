import {
  DataTypes,
  Model,
  type InferAttributes,
  type InferCreationAttributes,
  type CreationOptional,
} from "sequelize";
import { ensureMysqlUtf8mb4Table, getSequelize } from "@/lib/sequelize.server";

export class ContactLead extends Model<
  InferAttributes<ContactLead>,
  InferCreationAttributes<ContactLead>
> {
  declare id: CreationOptional<string>;
  declare name: string;
  declare phone: string;
  declare email: string | null;
  declare post: string;
  declare source: string | null;
  declare state: string | null;
  declare city: string | null;
  declare message: string | null;
  declare createdAt: CreationOptional<Date>;
}

let modelInitialized = false;
let syncPromise: Promise<void> | undefined;

export function initContactLead(): typeof ContactLead {
  if (!modelInitialized) {
    modelInitialized = true;
    ContactLead.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        name: { type: DataTypes.STRING(80), allowNull: false },
        phone: { type: DataTypes.STRING(20), allowNull: false },
        email: { type: DataTypes.STRING(120), allowNull: true },
        post: { type: DataTypes.STRING(60), allowNull: false },
        source: { type: DataTypes.STRING(40), allowNull: true },
        state: { type: DataTypes.STRING(60), allowNull: true },
        city: { type: DataTypes.STRING(80), allowNull: true },
        message: { type: DataTypes.TEXT, allowNull: true },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
          field: "created_at",
        },
      },
      {
        sequelize: getSequelize(),
        modelName: "ContactLead",
        tableName: "contact_leads",
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: false,
      },
    );
  }
  return ContactLead;
}

export async function getContactLeadModel(): Promise<typeof ContactLead> {
  const model = initContactLead();
  if (!syncPromise) {
    syncPromise = model.sync().then(
      () => ensureMysqlUtf8mb4Table("contact_leads"),
      (error) => {
        syncPromise = undefined;
        throw error;
      },
    );
  }
  await syncPromise;
  return model;
}
