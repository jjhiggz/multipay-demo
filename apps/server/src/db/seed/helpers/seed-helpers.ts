import { _addUserToOrganization } from "./add-user-to-organization";
import { _createOrganization } from "./create-organization";
import { _createRecipientsForOrganization } from "./create-recipients";
import { _createUser } from "./create-user";
import { _getRecipientData } from "./recipient-data";
import { _resetDatabase } from "./reset-database";
import { _createProfile } from "./create-profile";

export const seedHelpers = {
  resetDatabase: _resetDatabase,
  addUserToOrganization: _addUserToOrganization,
  createOrganization: _createOrganization,
  createUser: _createUser,
  createRecipientsForOrganization: _createRecipientsForOrganization,
  getRecipientData: _getRecipientData,
  createProfile: _createProfile,
};
