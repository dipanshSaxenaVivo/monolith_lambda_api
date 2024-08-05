export enum ResponseCodeEnum {
  OK = 1,
  INTERNAL_SERVER_ERROR = 2,
  RESOURCE_NOT_FOUND = 3,
  EMAIL_NOT_VALID = 4,
  PHONE_NUMBER_NOT_VALID = 5,
  BAD_ADD_USER_REQUEST = 6,
  USER_EMAIL_REQUIRED = 7,
  USER_NAME_REQUIRED = 8,
  USER_ROLE_REQUIRED = 9,
  USER_NAME_MIN_5 = 10,
  USER_NAME_MAX_15 = 11,
  INVALID_BODY = 12,
  ID_IS_REQUIRED = 13,
  USER_ALREADY_EXIST = 14,
  USER_ID_NOT_EXIST = 15,
  
  // Prisma Client (Query Engine)
  InvalidDatabaseString = "P1013",
  UnderlyingModelDoesNotExist = "P1014",
  UnsupportedDatabaseFeatures = "P1015",
  IncorrectParameterCount = "P1016",
  ConnectionClosed = "P1017",
  ValueTooLong = "P2000",
  RecordNotFound = "P2001",
  UniqueConstraintFailed = "P2002",
  ForeignKeyConstraintFailed = "P2003",
  ConstraintFailed = "P2004",
  InvalidStoredValue = "P2005",
  InvalidFieldValue = "P2006",
  DataValidationError = "P2007",
  QueryParseFailure = "P2008",
  QueryValidationFailure = "P2009",
  RawQueryFailed = "P2010",
  NullConstraintViolation = "P2011",
  MissingRequiredValue = "P2012",
  MissingRequiredArgument = "P2013",
  RelationViolation = "P2014",
  RelatedRecordNotFound = "P2015",
  QueryInterpretationError = "P2016",
  RecordsNotConnected = "P2017",
  RequiredConnectedRecordsNotFound = "P2018",
  InputError = "P2019",
  ValueOutOfRange = "P2020",
  TableDoesNotExist = "P2021",
  ColumnDoesNotExist = "P2022",
  InconsistentColumnData = "P2023",
  ConnectionPoolTimeout = "P2024",
  RecordRequiredButNotFound = "P2025",
  UnsupportedFeature = "P2026",
  MultipleErrors = "P2027",
  TransactionApiError = "P2028",
  QueryParameterLimitExceeded = "P2029",
  FullTextIndexNotFound = "P2030",
  MongoDbReplicaSetRequired = "P2031",
  NumberOutOfRange = "P2033",
  TransactionWriteConflict = "P2034",
  AssertionViolation = "P2035",
  ExternalConnectorError = "P2036",
  TooManyDatabaseConnections = "P2037",

}
