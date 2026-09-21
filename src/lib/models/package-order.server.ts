import {
  DataTypes,
  Model,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
} from "sequelize";
import { ensureMysqlUtf8mb4Table, getSequelize } from "@/lib/sequelize.server";

export type PackageOrderStatus = "created" | "pending" | "paid" | "failed" | "cancelled";

export class PackageOrder extends Model<
  InferAttributes<PackageOrder>,
  InferCreationAttributes<PackageOrder>
> {
  declare id: CreationOptional<string>;
  declare name: string;
  declare phone: string;
  declare email: string;
  declare city: string;
  declare state: string;
  declare pincode: string;
  declare packageName: string;
  declare amountPaise: number;
  declare currency: CreationOptional<string>;
  declare status: CreationOptional<PackageOrderStatus>;
  declare contactLeadId: string | null;
  declare razorpayOrderId: string | null;
  declare razorpayPaymentId: string | null;
  declare razorpaySignature: string | null;
  declare pageUrl: string | null;
  declare utmSource: string | null;
  declare utmMedium: string | null;
  declare utmCampaign: string | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

let modelInitialized = false;
let syncPromise: Promise<void> | undefined;

export function initPackageOrder(): typeof PackageOrder {
  if (!modelInitialized) {
    modelInitialized = true;
    PackageOrder.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        name: { type: DataTypes.STRING(80), allowNull: false },
        phone: { type: DataTypes.STRING(20), allowNull: false },
        email: { type: DataTypes.STRING(120), allowNull: false },
        city: { type: DataTypes.STRING(80), allowNull: false },
        state: { type: DataTypes.STRING(80), allowNull: false },
        pincode: { type: DataTypes.STRING(12), allowNull: false },
        packageName: {
          type: DataTypes.STRING(120),
          allowNull: false,
          field: "package_name",
        },
        amountPaise: {
          type: DataTypes.INTEGER,
          allowNull: false,
          field: "amount_paise",
        },
        currency: {
          type: DataTypes.STRING(8),
          allowNull: false,
          defaultValue: "INR",
        },
        status: {
          type: DataTypes.STRING(20),
          allowNull: false,
          defaultValue: "created",
        },
        contactLeadId: {
          type: DataTypes.UUID,
          allowNull: true,
          field: "contact_lead_id",
        },
        razorpayOrderId: {
          type: DataTypes.STRING(80),
          allowNull: true,
          field: "razorpay_order_id",
        },
        razorpayPaymentId: {
          type: DataTypes.STRING(80),
          allowNull: true,
          field: "razorpay_payment_id",
        },
        razorpaySignature: {
          type: DataTypes.STRING(200),
          allowNull: true,
          field: "razorpay_signature",
        },
        pageUrl: {
          type: DataTypes.STRING(500),
          allowNull: true,
          field: "page_url",
        },
        utmSource: {
          type: DataTypes.STRING(80),
          allowNull: true,
          field: "utm_source",
        },
        utmMedium: {
          type: DataTypes.STRING(80),
          allowNull: true,
          field: "utm_medium",
        },
        utmCampaign: {
          type: DataTypes.STRING(120),
          allowNull: true,
          field: "utm_campaign",
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
          field: "created_at",
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
          field: "updated_at",
        },
      },
      {
        sequelize: getSequelize(),
        modelName: "PackageOrder",
        tableName: "package_orders",
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
      },
    );
  }

  return PackageOrder;
}

export async function getPackageOrderModel(): Promise<typeof PackageOrder> {
  const model = initPackageOrder();
  if (!syncPromise) {
    // alter so contact_lead_id is added on existing package_orders tables
    syncPromise = model.sync({ alter: true }).then(
      () => ensureMysqlUtf8mb4Table("package_orders"),
      (error) => {
        syncPromise = undefined;
        throw error;
      },
    );
  }
  await syncPromise;
  return model;
}
