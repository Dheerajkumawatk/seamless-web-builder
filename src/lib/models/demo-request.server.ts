import {
  DataTypes,
  Model,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
} from "sequelize";
import { ensureMysqlUtf8mb4Table, getSequelize } from "@/lib/sequelize.server";

export class DemoRequest extends Model<
  InferAttributes<DemoRequest>,
  InferCreationAttributes<DemoRequest>
> {
  declare id: CreationOptional<string>;
  declare name: string;
  declare phone: string;
  declare photo: string | null;
  declare village: string | null;
  declare district: string | null;
  declare post: string | null;
  declare source: string | null;
  declare pageUrl: string | null;
  declare utmSource: string | null;
  declare utmMedium: string | null;
  declare utmCampaign: string | null;
  declare status: CreationOptional<string>;
  declare notes: string | null;
  declare createdAt: CreationOptional<Date>;
}

let modelInitialized = false;
let syncPromise: Promise<void> | undefined;

export function initDemoRequest(): typeof DemoRequest {
  if (!modelInitialized) {
    modelInitialized = true;
    DemoRequest.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        name: { type: DataTypes.STRING(80), allowNull: false },
        phone: { type: DataTypes.STRING(20), allowNull: false },
        photo: { type: DataTypes.STRING(500), allowNull: true },
        village: { type: DataTypes.STRING(120), allowNull: true },
        district: { type: DataTypes.STRING(80), allowNull: true },
        post: { type: DataTypes.STRING(80), allowNull: true },
        source: { type: DataTypes.STRING(80), allowNull: true },
        pageUrl: { type: DataTypes.STRING(500), allowNull: true, field: "page_url" },
        utmSource: { type: DataTypes.STRING(80), allowNull: true, field: "utm_source" },
        utmMedium: { type: DataTypes.STRING(80), allowNull: true, field: "utm_medium" },
        utmCampaign: { type: DataTypes.STRING(120), allowNull: true, field: "utm_campaign" },
        status: {
          type: DataTypes.STRING(40),
          allowNull: false,
          defaultValue: "NEW",
        },
        notes: { type: DataTypes.TEXT, allowNull: true },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
          field: "created_at",
        },
      },
      {
        sequelize: getSequelize(),
        modelName: "DemoRequest",
        tableName: "demo_requests",
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: false,
      },
    );
  }

  return DemoRequest;
}

export async function getDemoRequestModel(): Promise<typeof DemoRequest> {
  const model = initDemoRequest();
  if (!syncPromise) {
    syncPromise = model.sync().then(
      () => ensureMysqlUtf8mb4Table("demo_requests"),
      (error) => {
        syncPromise = undefined;
        throw error;
      },
    );
  }
  await syncPromise;
  return model;
}
