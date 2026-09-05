import {
  CreationOptional,
  DataTypes,
  Model,
  type InferAttributes,
  type InferCreationAttributes,
} from "sequelize";
import { getSequelize } from "@/lib/sequelize.server";

export class VikasMitraProfileModel extends Model<
  InferAttributes<VikasMitraProfileModel>,
  InferCreationAttributes<VikasMitraProfileModel>
> {
  declare id: CreationOptional<string>;
  declare name: string;
  declare phone: string;
  declare email: string | null;
  declare district: string;
  declare tehsil: string;
  declare village: string;
  declare occupation: string | null;
  declare experience: string | null;
  declare message: string | null;
  declare photo: string | null;
  declare panCard: string | null;
  declare aadhaarCard: string | null;
  declare status: CreationOptional<"pending" | "approved" | "rejected">;
  declare rejectionMessage: string | null;
  declare createdAt: CreationOptional<Date>;
}

let modelInitialized = false;
let syncPromise: Promise<void> | undefined;

export function initVikasMitraProfileModel(): typeof VikasMitraProfileModel {
  if (!modelInitialized) {
    modelInitialized = true;
    VikasMitraProfileModel.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        name: { type: DataTypes.STRING(80), allowNull: false },
        phone: { type: DataTypes.STRING(20), allowNull: false },
        email: { type: DataTypes.STRING(120), allowNull: true },
        district: { type: DataTypes.STRING(80), allowNull: false },
        tehsil: { type: DataTypes.STRING(80), allowNull: false },
        village: { type: DataTypes.STRING(80), allowNull: false },
        occupation: { type: DataTypes.STRING(100), allowNull: true },
        experience: { type: DataTypes.STRING(60), allowNull: true },
        message: { type: DataTypes.TEXT, allowNull: true },
        photo: { type: DataTypes.STRING(500), allowNull: true },
        panCard: { type: DataTypes.STRING(500), allowNull: true, field: "pan_card" },
        aadhaarCard: { type: DataTypes.STRING(500), allowNull: true, field: "aadhaar_card" },
        status: {
          type: DataTypes.ENUM("pending", "approved", "rejected"),
          allowNull: false,
          defaultValue: "pending",
        },
        rejectionMessage: {
          type: DataTypes.STRING(500),
          allowNull: true,
          field: "rejection_message",
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
          field: "created_at",
        },
      },
      {
        sequelize: getSequelize(),
        modelName: "VikasMitraProfile",
        tableName: "vikas_mitra_profiles",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: false,
      },
    );
  }
  return VikasMitraProfileModel;
}

export async function getVikasMitraProfileModel(): Promise<typeof VikasMitraProfileModel> {
  const model = initVikasMitraProfileModel();
  if (!syncPromise) {
    syncPromise = model.sync().then(
      () => undefined,
      (error) => {
        syncPromise = undefined;
        throw error;
      },
    );
  }
  await syncPromise;
  return model;
}
