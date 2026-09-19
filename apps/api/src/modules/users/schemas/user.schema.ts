import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { UserRole } from '../enums/user-role.enum';
import { UserStatus } from '../enums/user-status.enum';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
  collection: 'users',
})
export class User {
  // ==========================
  // Identity
  // ==========================

  @Prop({
    required: true,
    trim: true,
    unique: true,
  })
  phone: string;

  @Prop({
    required: true,
    select: false,
  })
  password: string;

  

  @Prop({
    trim: true,
  })
  firstName?: string;

  @Prop({
    trim: true,
  })
  lastName?: string;

  @Prop()
  avatar?: string;

  @Prop({
    default: 'KE',
    uppercase: true,
  })
  country: string;

  // ==========================
  // Account
  // ==========================

  @Prop({
    type: String,
    enum: UserRole,
    default: UserRole.PLAYER,
  })
  role: UserRole;

  @Prop({
    type: String,
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
  status: UserStatus;

  @Prop({
    default: false,
  })
  emailVerified: boolean;

  @Prop({
    default: false,
  })
  phoneVerified: boolean;

  @Prop({
    default: false,
  })
  kycVerified: boolean;

  // ==========================
  // Security
  // ==========================

  @Prop({
    default: 0,
  })
  failedLoginAttempts: number;

  @Prop()
  lockUntil?: Date;

  @Prop()
  lastLoginAt?: Date;

  @Prop()
  lastLoginIp?: string;

  @Prop({
    select: false,
  })
  refreshTokenHash?: string;

  @Prop()
  passwordChangedAt?: Date;

  // ==========================
  // Permissions
  // ==========================

  @Prop({
    type: [String],
    default: [],
  })
  permissions: string[];

  // ==========================
  // Referral
  // ==========================

  @Prop()
  referralCode?: string;

  @Prop()
  referredBy?: string;

  // ==========================
  // Responsible Gaming
  // ==========================

  @Prop({
    default: false,
  })
  selfExcluded: boolean;

  @Prop()
  selfExcludedUntil?: Date;

  @Prop()
  dailyDepositLimit?: number;

  @Prop()
  monthlyDepositLimit?: number;

  // ==========================
  // Notification Preferences
  // ==========================

  @Prop({
    default: true,
  })
  emailNotifications: boolean;

  @Prop({
    default: true,
  })
 smsNotifications: boolean;

  @Prop({
    default: true,
  })
  pushNotifications: boolean;

  // ==========================
  // Activity
  // ==========================

  @Prop()
  lastSeenAt?: Date;

  @Prop({
    default: false,
  })
  isDeleted: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

// ==========================
// Indexes
// ==========================

UserSchema.index({ phone: 1 }, { unique: true });


UserSchema.index(
  { referralCode: 1 },
  { unique: true, sparse: true },
);

UserSchema.index({ role: 1 });
UserSchema.index({ status: 1 });
UserSchema.index({ country: 1 });
UserSchema.index({ createdAt: -1 });
UserSchema.index({ lastLoginAt: -1 });

UserSchema.index({ role: 1, status: 1 });
UserSchema.index({ country: 1, status: 1 });