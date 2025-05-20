import type { systemFieldsOutputSchema } from "@/db/schema/system-fields.schema";
import type { z } from "zod";

export const defaultSystemFieldsReturn: z.infer<
  typeof systemFieldsOutputSchema
> = {
  action: "ForceUpdate",
  actionValue:
    "Update is required. Min version '7.20.0' is greater then app version '7.19.0'.",
  configSettings: {
    logDisable: false,
    logMinimumLevel: "Notice",
  },
  documents: {
    complaintsCharter: "CC_XEMT_US",
    complianceGuarantee: "CG_XEMT_US",
    consumerProtection: "CP_XEMT_US",
    cookieNoticeVersionAvailable: "CN_XEMT",
    documentLinks: {
      CC_XEMT_US: "https://help.xe.com/hc/en/articles/360020233417",
      CG_XEMT_US: "https://help.xe.com/hc/en/articles/4408070878865",
      CN_XEMT: "https://help.xe.com/hc/en/articles/4408642862865",
      CP_XEMT_US: "https://help.xe.com/hc/en/articles/360020363838",
      ERC_XEMT_US: "https://help.xe.com/hc/en/articles/4403064056209",
      II_XEMT_US: "https://help.xe.com/hc/en/sections/360005782618",
      PAD_XEMT_US_PERSONAL: "https://help.xe.com/hc/en/articles/360020363658",
      PRIV_POLICY_XEMT_US: "https://help.xe.com/hc/en/articles/19592734245009",
      XEMT_US_CONSUMER: "https://help.xe.com/hc/en/articles/360020230677",
    },
    errResolutionCancellationDisc: "ERC_XEMT_US",
    importantInformation: "II_XEMT_US",
    preAuthDebit: "PAD_XEMT_US_PERSONAL",
    privacyPolicyVersionAvailable: "PRIV_POLICY_XEMT_US",
    termsAndConditionsVersionAvailable: "XEMT_US_CONSUMER",
  },
  featureToggle: {
    enableInterac: "True",
    enablePromotions: "True",
    enableXeSim: "False",
    inAppReviewsEnabled: "True",
    serviceMessaging: [
      {
        phoneCountry: "US",
        replyTo: "86654",
      },
      {
        phoneCountry: "CA",
        replyTo: "3233",
      },
    ],
  },
  formData: {
    additionalForm: {
      formFields: [
        {
          disabled: false,
          id: "occupations",
          options: [
            {
              allowFreeText: false,
              text: "Accountant",
              value: "ACCOUNTANT_6",
            },
            {
              allowFreeText: false,
              text: "Actor",
              value: "ACTOR_6",
            },
            {
              allowFreeText: false,
              text: "Actress",
              value: "ACTRESS_6",
            },
            {
              allowFreeText: false,
              text: "Administrative Worker",
              value: "ADMINISTRATIVE_WORKER_6",
            },
            {
              allowFreeText: false,
              text: "Administrative Secretary",
              value: "ADMINISTRATIVE_SECRETARY_6",
            },
            {
              allowFreeText: false,
              text: "Advertising Manager",
              value: "ADVERTISING_MANAGER_6",
            },
            {
              allowFreeText: false,
              text: "Agricultural Worker",
              value: "AGRICULTURAL_WORKER_6",
            },
            {
              allowFreeText: false,
              text: "Airline Worker",
              value: "AIRLINE_WORKER_6",
            },
            {
              allowFreeText: false,
              text: "Architect",
              value: "ARCHITECT_6",
            },
            {
              allowFreeText: false,
              text: "Architectural Technician",
              value: "ARCHITECTURAL_TECHNICIAN_6",
            },
            {
              allowFreeText: false,
              text: "Art Gallery Curator",
              value: "ART_GALLERY_CURATOR_6",
            },
            {
              allowFreeText: false,
              text: "Artist",
              value: "ARTIST_6",
            },
            {
              allowFreeText: false,
              text: "Art Restorer",
              value: "ART_RESTORER_6",
            },
            {
              allowFreeText: false,
              text: "Athlete - Professional",
              value: "ATHLETE_PROFESSIONAL_6",
            },
            {
              allowFreeText: false,
              text: "Auditor",
              value: "AUDITOR_6",
            },
            {
              allowFreeText: false,
              text: "Auditing Clerk",
              value: "AUDITING_CLERK_6",
            },
            {
              allowFreeText: false,
              text: "Baker",
              value: "BAKER_6",
            },
            {
              allowFreeText: false,
              text: "Bank Clerk",
              value: "BANK_CLERK_6",
            },
            {
              allowFreeText: false,
              text: "Barber",
              value: "BARBER_6",
            },
            {
              allowFreeText: false,
              text: "Bartender",
              value: "BARTENDER_6",
            },
            {
              allowFreeText: false,
              text: "Beautician",
              value: "BEAUTICIAN_6",
            },
            {
              allowFreeText: false,
              text: "Billing Clerk",
              value: "BILLING_CLERK_6",
            },
            {
              allowFreeText: false,
              text: "Bookkeeper",
              value: "BOOKKEEPER_6",
            },
            {
              allowFreeText: false,
              text: "Cab Driver",
              value: "CAB_DRIVER_6",
            },
            {
              allowFreeText: false,
              text: "Carpenter",
              value: "CARPENTER_6",
            },
            {
              allowFreeText: false,
              text: "Cashier",
              value: "CASHIER_6",
            },
            {
              allowFreeText: false,
              text: "Chief Executive",
              value: "CHIEF_EXECUTIVE_6",
            },
            {
              allowFreeText: false,
              text: "Civil Engineer",
              value: "CIVIL_ENGINEER_6",
            },
            {
              allowFreeText: false,
              text: "Cleaner",
              value: "CLEANER_6",
            },
            {
              allowFreeText: false,
              text: "Construction Worker",
              value: "CONSTRUCTION_WORKER_6",
            },
            {
              allowFreeText: false,
              text: "Coach",
              value: "COACH_6",
            },
            {
              allowFreeText: false,
              text: "Cook",
              value: "COOK_6",
            },
            {
              allowFreeText: false,
              text: "Correctional Officer",
              value: "CORRECTIONAL_OFFICER_6",
            },
            {
              allowFreeText: false,
              text: "Customer Service Representative",
              value: "CUSTOMER_SERVICE_REPRESENTATIVE",
            },
            {
              allowFreeText: false,
              text: "Customs Officer",
              value: "CUSTOMS_OFFICER_6",
            },
            {
              allowFreeText: false,
              text: "Dental Assistant",
              value: "DENTAL_ASSISTANT_6",
            },
            {
              allowFreeText: false,
              text: "Dental Surgeon",
              value: "DENTAL_SURGEON_6",
            },
            {
              allowFreeText: false,
              text: "Dental Technician",
              value: "DENTAL_TECHNICIAN_6",
            },
            {
              allowFreeText: false,
              text: "Dentist",
              value: "DENTIST_6",
            },
            {
              allowFreeText: false,
              text: "Dishwasher",
              value: "DISHWASHER_6",
            },
            {
              allowFreeText: false,
              text: "Doctor",
              value: "DOCTOR_6",
            },
            {
              allowFreeText: false,
              text: "Dressmaker",
              value: "DRESSMAKER_6",
            },
            {
              allowFreeText: false,
              text: "Driver",
              value: "DRIVER_6",
            },
            {
              allowFreeText: false,
              text: "Driving Instructor",
              value: "DRIVING_INSTRUCTOR_6",
            },
            {
              allowFreeText: false,
              text: "Editor",
              value: "EDITOR_6",
            },
            {
              allowFreeText: false,
              text: "Electrical Engineer",
              value: "ELECTRICAL_ENGINEER_6",
            },
            {
              allowFreeText: false,
              text: "Electrician",
              value: "ELECTRICIAN_6",
            },
            {
              allowFreeText: false,
              text: "Employment Agency Worker",
              value: "EMPLOYMENT_AGENCY_WORKER_6",
            },
            {
              allowFreeText: false,
              text: "Engineer",
              value: "ENGINEER_6",
            },
            {
              allowFreeText: false,
              text: "Farm Worker",
              value: "FARM_WORKER_6",
            },
            {
              allowFreeText: false,
              text: "Farmer",
              value: "FARMER_6",
            },
            {
              allowFreeText: false,
              text: "Fashion Designer",
              value: "FASHION_DESIGNER_6",
            },
            {
              allowFreeText: false,
              text: "Financial Analyst",
              value: "FINANCIAL_ANALYST_6",
            },
            {
              allowFreeText: false,
              text: "Financial Officer",
              value: "FINANCIAL_OFFICER_6",
            },
            {
              allowFreeText: false,
              text: "Financial services manager",
              value: "FINANCIAL_SERVICES_MANAGER_6",
            },
            {
              allowFreeText: false,
              text: "Financial services worker",
              value: "FINANCIAL_SERVICES_WORKER_6",
            },
            {
              allowFreeText: false,
              text: "Firefighter",
              value: "FIREFIGHTER_6",
            },
            {
              allowFreeText: false,
              text: "Fire Inspector",
              value: "FIRE_INSPECTOR_6",
            },
            {
              allowFreeText: false,
              text: "Fitness Trainer",
              value: "FITNESS_TRAINER_6",
            },
            {
              allowFreeText: false,
              text: "Flight Attendant",
              value: "FLIGHT_ATTENDANT_6",
            },
            {
              allowFreeText: false,
              text: "Flying Instructor",
              value: "FLYING_INSTRUCTOR_6",
            },
            {
              allowFreeText: false,
              text: "Food Industry manager",
              value: "FOOD_INDUSTRY_MANAGER_6",
            },
            {
              allowFreeText: false,
              text: "Food industry worker",
              value: "FOOD_INDUSTRY_WORKER_6",
            },
            {
              allowFreeText: false,
              text: "Foreign Exchange Worker",
              value: "FOREIGN_EXCHANGE_WORKER_6",
            },
            {
              allowFreeText: false,
              text: "Forestry Worker",
              value: "FORESTRY_WORKER_6",
            },
            {
              allowFreeText: false,
              text: "Freight Worker",
              value: "FREIGHT_WORKER_6",
            },
            {
              allowFreeText: false,
              text: "Parks Worker",
              value: "PARKS_WORKER_6",
            },
            {
              allowFreeText: false,
              text: "Funeral Service Worker",
              value: "FUNERAL_SERVICE_WORKER_6",
            },
            {
              allowFreeText: false,
              text: "General Manager",
              value: "GENERAL_MANAGER_6",
            },
            {
              allowFreeText: false,
              text: "Glassworker",
              value: "GLASSWORKER_6",
            },
            {
              allowFreeText: false,
              text: "Government Official - Elected",
              value: "GOVERNMENT_OFFICIAL_-_ELECTED_6",
            },
            {
              allowFreeText: false,
              text: "Government Official - Non-elected",
              value: "GOVERNMENT_OFFICIAL_-_NON-ELECTED",
            },
            {
              allowFreeText: false,
              text: "Graphic Designer",
              value: "GRAPHIC_DESIGNER_6",
            },
            {
              allowFreeText: false,
              text: "Groundskeeper",
              value: "GROUNDSKEEPER_6",
            },
            {
              allowFreeText: false,
              text: "Guidance Counsellor",
              value: "GUIDANCE_COUNSELLOR_6",
            },
            {
              allowFreeText: false,
              text: "Hairdresser",
              value: "HAIRDRESSER_6",
            },
            {
              allowFreeText: false,
              text: "Healthcare Worker",
              value: "HEALTHCARE_WORKER_6",
            },
            {
              allowFreeText: false,
              text: "Hotel Worker",
              value: "HOTEL_WORKER_6",
            },
            {
              allowFreeText: false,
              text: "Housekeeper",
              value: "HOUSEKEEPER_6",
            },
            {
              allowFreeText: false,
              text: "Human Resources Worker",
              value: "HUMAN_RESOURCES_WORKER_6",
            },
            {
              allowFreeText: false,
              text: "HVAC",
              value: "HVAC_6",
            },
            {
              allowFreeText: false,
              text: "Industrial Designer",
              value: "INDUSTRIAL_DESIGNER_6",
            },
            {
              allowFreeText: false,
              text: "Insurance Collector",
              value: "INSURANCE_COLLECTOR_6",
            },
            {
              allowFreeText: false,
              text: "Insurance Salesperson",
              value: "INSURANCE_SALESPERSON_6",
            },
            {
              allowFreeText: false,
              text: "Insurance Worker",
              value: "INSURANCE_WORKER_6",
            },
            {
              allowFreeText: false,
              text: "Interior Designer",
              value: "INTERIOR_DESIGNER_6",
            },
            {
              allowFreeText: false,
              text: "IT/Computer Network Manager",
              value: "IT/COMPUTER_NETWORK_MANAGER_6",
            },
            {
              allowFreeText: false,
              text: "IT/Computer Programmer",
              value: "IT/COMPUTER_PROGRAMMER_6",
            },
            {
              allowFreeText: false,
              text: "Janitor",
              value: "JANITOR_6",
            },
            {
              allowFreeText: false,
              text: "Jewellery Designer",
              value: "JEWELLERY_DESIGNER_6",
            },
            {
              allowFreeText: false,
              text: "Jewellery Maker",
              value: "JEWELLERY_MAKER_6",
            },
            {
              allowFreeText: false,
              text: "Journalist",
              value: "JOURNALIST_6",
            },
            {
              allowFreeText: false,
              text: "Judge",
              value: "JUDGE_6",
            },
            {
              allowFreeText: false,
              text: "Laboratory Assistant",
              value: "LABORATORY_ASSISTANT_6",
            },
            {
              allowFreeText: false,
              text: "Landlord",
              value: "LANDLORD_6",
            },
            {
              allowFreeText: false,
              text: "Landscaper",
              value: "LANDSCAPER_6",
            },
            {
              allowFreeText: false,
              text: "Lawyer",
              value: "LAWYER_6",
            },
            {
              allowFreeText: false,
              text: "Legal Assistant",
              value: "LEGAL_ASSISTANT_6",
            },
            {
              allowFreeText: false,
              text: "Librarian",
              value: "LIBRARIAN_6",
            },
            {
              allowFreeText: false,
              text: "Machine Operator",
              value: "MACHINE_OPERATOR_6",
            },
            {
              allowFreeText: false,
              text: "Maintenance Worker",
              value: "MAINTENANCE_WORKER_6",
            },
            {
              allowFreeText: false,
              text: "Management Accountant",
              value: "MANAGEMENT_ACCOUNTANT_6",
            },
            {
              allowFreeText: false,
              text: "Management Analyst",
              value: "MANAGEMENT_ANALYST_6",
            },
            {
              allowFreeText: false,
              text: "Management Consultant",
              value: "MANAGEMENT_CONSULTANT_6",
            },
            {
              allowFreeText: false,
              text: "Marketing",
              value: "MARKETING_6",
            },
            {
              allowFreeText: false,
              text: "Marketing Manager",
              value: "MARKETING_MANAGER_6",
            },
            {
              allowFreeText: false,
              text: "Massage Therapist",
              value: "MASSAGE_THERAPIST_6",
            },
            {
              allowFreeText: false,
              text: "Mechanic",
              value: "MECHANIC_6",
            },
            {
              allowFreeText: false,
              text: "Mechanical Engineer",
              value: "MECHANICAL_ENGINEER_6",
            },
            {
              allowFreeText: false,
              text: "Medical Assistant",
              value: "MEDICAL_ASSISTANT_6",
            },
            {
              allowFreeText: false,
              text: "Military",
              value: "MILITARY_6",
            },
            {
              allowFreeText: false,
              text: "Miner",
              value: "MINER_6",
            },
            {
              allowFreeText: false,
              text: "Mining Manager",
              value: "MINING_MANAGER_6",
            },
            {
              allowFreeText: false,
              text: "Model",
              value: "MODEL_6",
            },
            {
              allowFreeText: false,
              text: "Mover",
              value: "MOVER_6",
            },
            {
              allowFreeText: false,
              text: "Multimedia Designer",
              value: "MULTIMEDIA_DESIGNER_6",
            },
            {
              allowFreeText: false,
              text: "Multimedia Programmer",
              value: "MULTIMEDIA_PROGRAMMER_6",
            },
            {
              allowFreeText: false,
              text: "Museum Curator",
              value: "MUSEUM_CURATOR_6",
            },
            {
              allowFreeText: false,
              text: "Music Director",
              value: "MUSIC_DIRECTOR_6",
            },
            {
              allowFreeText: false,
              text: "Musician",
              value: "MUSICIAN_6",
            },
            {
              allowFreeText: false,
              text: "Newspaper Editor",
              value: "NEWSPAPER_EDITOR_6",
            },
            {
              allowFreeText: false,
              text: "Notary",
              value: "NOTARY_6",
            },
            {
              allowFreeText: false,
              text: "Nurse",
              value: "NURSE_6",
            },
            {
              allowFreeText: false,
              text: "Office Clerk",
              value: "OFFICE_CLERK_6",
            },
            {
              allowFreeText: false,
              text: "Order Filler",
              value: "ORDER_FILLER_6",
            },
            {
              allowFreeText: false,
              text: "Operations Manager",
              value: "OPERATIONS_MANAGER_6",
            },
            {
              allowFreeText: false,
              text: "Packer",
              value: "PACKER_6",
            },
            {
              allowFreeText: false,
              text: "Painter",
              value: "PAINTER_6",
            },
            {
              allowFreeText: false,
              text: "Paramedic",
              value: "PARAMEDIC_6",
            },
            {
              allowFreeText: false,
              text: "Patent Agent",
              value: "PATENT_AGENT_6",
            },
            {
              allowFreeText: false,
              text: "Personal Care Aides",
              value: "PERSONAL_CARE_AIDES_6",
            },
            {
              allowFreeText: false,
              text: "Pharmacist",
              value: "PHARMACIST_6",
            },
            {
              allowFreeText: false,
              text: "Pharmacy Technician",
              value: "PHARMACY_TECHNICIAN_6",
            },
            {
              allowFreeText: false,
              text: "Photographer",
              value: "PHOTOGRAPHER_6",
            },
            {
              allowFreeText: false,
              text: "Physical Therapist",
              value: "PHYSICAL_THERAPIST_6",
            },
            {
              allowFreeText: false,
              text: "Physician",
              value: "PHYSICIAN_6",
            },
            {
              allowFreeText: false,
              text: "Pilot",
              value: "PILOT_6",
            },
            {
              allowFreeText: false,
              text: "Plumber",
              value: "PLUMBER_6",
            },
            {
              allowFreeText: false,
              text: "Police Officer",
              value: "POLICE_OFFICER_6",
            },
            {
              allowFreeText: false,
              text: "Police Worker",
              value: "POLICE_WORKER_6",
            },
            {
              allowFreeText: false,
              text: "Postal Service Carrier",
              value: "POSTAL_SERVICE_CARRIER_6",
            },
            {
              allowFreeText: false,
              text: "Postal Service Worker",
              value: "POSTAL_SERVICE_WORKER_6",
            },
            {
              allowFreeText: false,
              text: "Prison Guard",
              value: "PRISON_GUARD_6",
            },
            {
              allowFreeText: false,
              text: "Product Designer",
              value: "PRODUCT_DESIGNER_6",
            },
            {
              allowFreeText: false,
              text: "Project Manager",
              value: "PROJECT_MANAGER_6",
            },
            {
              allowFreeText: false,
              text: "Property Manager",
              value: "PROPERTY_MANAGER_6",
            },
            {
              allowFreeText: false,
              text: "Public Administration Worker",
              value: "PUBLIC_ADMINISTRATION_WORKER_6",
            },
            {
              allowFreeText: false,
              text: "Publisher",
              value: "PUBLISHER_6",
            },
            {
              allowFreeText: false,
              text: "Purchasing Buyer",
              value: "PURCHASING_BUYER_6",
            },
            {
              allowFreeText: false,
              text: "Purchasing Merchandiser",
              value: "PURCHASING_MERCHANDISER_6",
            },
            {
              allowFreeText: false,
              text: "Purchasing Officer",
              value: "PURCHASING_OFFICER__6",
            },
            {
              allowFreeText: false,
              text: "Radio and TV Technician",
              value: "RADIO_AND_TV_TECHNICIAN_6",
            },
            {
              allowFreeText: false,
              text: "Rail Transport",
              value: "RAIL_TRANSPORT_6",
            },
            {
              allowFreeText: false,
              text: "Rail Yard Worker",
              value: "RAIL_YARD_WORKER_6",
            },
            {
              allowFreeText: false,
              text: "Receptionist",
              value: "RECEPTIONIST_6",
            },
            {
              allowFreeText: false,
              text: "Recreation Worker",
              value: "RECREATION_WORKER_6",
            },
            {
              allowFreeText: false,
              text: "Real Estate Agent",
              value: "REAL_ESTATE_AGENT_6",
            },
            {
              allowFreeText: false,
              text: "Refuse Collector",
              value: "REFUSE_COLLECTOR_6",
            },
            {
              allowFreeText: false,
              text: "Rental Clerk",
              value: "RENTAL_CLERK_6",
            },
            {
              allowFreeText: false,
              text: "Retired",
              value: "RETIRED_6",
            },
            {
              allowFreeText: false,
              text: "RMT",
              value: "RMT_6",
            },
            {
              allowFreeText: false,
              text: "Road Worker",
              value: "ROAD_WORKER_6",
            },
            {
              allowFreeText: false,
              text: "Sales Manager",
              value: "SALES_MANAGER_6",
            },
            {
              allowFreeText: false,
              text: "Sales Representative",
              value: "SALES_REPRESENTATIVE_6",
            },
            {
              allowFreeText: false,
              text: "Scientist",
              value: "SCIENTIST_6",
            },
            {
              allowFreeText: false,
              text: "Security Guard",
              value: "SECURITY_GUARD_6",
            },
            {
              allowFreeText: false,
              text: "Social Worker",
              value: "SOCIAL_WORKER_6",
            },
            {
              allowFreeText: false,
              text: "Solicitor",
              value: "SOLICITOR_6",
            },
            {
              allowFreeText: false,
              text: "Software Developer",
              value: "SOFTWARE_DEVELOPER_6",
            },
            {
              allowFreeText: false,
              text: "Spa Worker",
              value: "SPA_WORKER_6",
            },
            {
              allowFreeText: false,
              text: "Stockbroker",
              value: "STOCKBROKER_6",
            },
            {
              allowFreeText: false,
              text: "Stock Clerk",
              value: "STOCK_CLERK_6",
            },
            {
              allowFreeText: false,
              text: "Storekeeper",
              value: "STOREKEEPER_6",
            },
            {
              allowFreeText: false,
              text: "Supervisor",
              value: "SUPERVISOR_6",
            },
            {
              allowFreeText: false,
              text: "Systems Analyst",
              value: "SYSTEMS_ANALYST_6",
            },
            {
              allowFreeText: false,
              text: "Tailor",
              value: "TAILOR_6",
            },
            {
              allowFreeText: false,
              text: "Taxi Dispatcher",
              value: "TAXI_DISPATCHER_6",
            },
            {
              allowFreeText: false,
              text: "Teacher",
              value: "TEACHER_6",
            },
            {
              allowFreeText: false,
              text: "Technologist",
              value: "TECHNOLOGIST_6",
            },
            {
              allowFreeText: false,
              text: "Telecommunications Worker",
              value: "TELECOMMUNICATIONS_WORKER_6",
            },
            {
              allowFreeText: false,
              text: "Telemarketer",
              value: "TELEMARKETER_6",
            },
            {
              allowFreeText: false,
              text: "Teller",
              value: "TELLER_6",
            },
            {
              allowFreeText: false,
              text: "Toolmaker",
              value: "TOOLMAKER_6",
            },
            {
              allowFreeText: false,
              text: "Travel Agency Worker",
              value: "TRAVEL_AGENCY_WORKER_6",
            },
            {
              allowFreeText: false,
              text: "Veterinarian",
              value: "VETERINARIAN_6",
            },
            {
              allowFreeText: false,
              text: "Veterinary Assistant",
              value: "VETERINARY_ASSISTANT_6",
            },
            {
              allowFreeText: false,
              text: "Veterinary Technician",
              value: "VETERINARY_TECHNICIAN_6",
            },
            {
              allowFreeText: false,
              text: "Waiting Staff",
              value: "WAITING_STAFF_6",
            },
            {
              allowFreeText: false,
              text: "Welder",
              value: "WELDER_6",
            },
            {
              allowFreeText: false,
              text: "Business Owner",
              value: "BUSINESS_OWNER_6",
            },
            {
              allowFreeText: false,
              text: "Diplomat",
              value: "DIPLOMAT_6",
            },
            {
              allowFreeText: false,
              text: "Director",
              value: "DIRECTOR_6",
            },
            {
              allowFreeText: false,
              text: "Student",
              value: "STUDENT_6",
            },
            {
              allowFreeText: false,
              text: "Unemployed",
              value: "UNEMPLOYED_6",
            },
            {
              allowFreeText: false,
              text: "Others",
              value: "OTHERS_6",
            },
          ],
          validators: [],
        },
      ],
      subtitles: [],
    },
    customerProfileForm: {
      formFields: [],
      subtitles: [],
    },
    moneyTransferCalculatorForm: {
      formFields: [
        {
          disabled: false,
          id: "phoneCountries",
          options: [
            {
              allowFreeText: false,
              text: "1",
              value: "AG",
            },
            {
              allowFreeText: false,
              text: "1",
              value: "AI",
            },
            {
              allowFreeText: false,
              text: "1",
              value: "AS",
            },
            {
              allowFreeText: false,
              text: "1",
              value: "BB",
            },
            {
              allowFreeText: false,
              text: "1",
              value: "BM",
            },
            {
              allowFreeText: false,
              text: "1",
              value: "BS",
            },
            {
              allowFreeText: false,
              text: "1",
              value: "CA",
            },
            {
              allowFreeText: false,
              text: "1",
              value: "DM",
            },
            {
              allowFreeText: false,
              text: "1",
              value: "DO",
            },
            {
              allowFreeText: false,
              text: "1",
              value: "GD",
            },
            {
              allowFreeText: false,
              text: "1",
              value: "GU",
            },
            {
              allowFreeText: false,
              text: "1",
              value: "JM",
            },
            {
              allowFreeText: false,
              text: "1",
              value: "KN",
            },
            {
              allowFreeText: false,
              text: "1",
              value: "KY",
            },
            {
              allowFreeText: false,
              text: "1",
              value: "LC",
            },
            {
              allowFreeText: false,
              text: "1",
              value: "MP",
            },
            {
              allowFreeText: false,
              text: "1",
              value: "MS",
            },
            {
              allowFreeText: false,
              text: "1",
              value: "PR",
            },
            {
              allowFreeText: false,
              text: "1",
              value: "SX",
            },
            {
              allowFreeText: false,
              text: "1",
              value: "TC",
            },
            {
              allowFreeText: false,
              text: "1",
              value: "TT",
            },
            {
              allowFreeText: false,
              text: "1",
              value: "US",
            },
            {
              allowFreeText: false,
              text: "1",
              value: "VC",
            },
            {
              allowFreeText: false,
              text: "1",
              value: "VG",
            },
            {
              allowFreeText: false,
              text: "1",
              value: "VI",
            },
            {
              allowFreeText: false,
              text: "20",
              value: "EG",
            },
            {
              allowFreeText: false,
              text: "211",
              value: "SS",
            },
            {
              allowFreeText: false,
              text: "212",
              value: "EH",
            },
            {
              allowFreeText: false,
              text: "212",
              value: "MA",
            },
            {
              allowFreeText: false,
              text: "213",
              value: "DZ",
            },
            {
              allowFreeText: false,
              text: "216",
              value: "TN",
            },
            {
              allowFreeText: false,
              text: "218",
              value: "LY",
            },
            {
              allowFreeText: false,
              text: "220",
              value: "GM",
            },
            {
              allowFreeText: false,
              text: "221",
              value: "SN",
            },
            {
              allowFreeText: false,
              text: "222",
              value: "MR",
            },
            {
              allowFreeText: false,
              text: "223",
              value: "ML",
            },
            {
              allowFreeText: false,
              text: "224",
              value: "GN",
            },
            {
              allowFreeText: false,
              text: "225",
              value: "CI",
            },
            {
              allowFreeText: false,
              text: "226",
              value: "BF",
            },
            {
              allowFreeText: false,
              text: "227",
              value: "NE",
            },
            {
              allowFreeText: false,
              text: "228",
              value: "TG",
            },
            {
              allowFreeText: false,
              text: "229",
              value: "BJ",
            },
            {
              allowFreeText: false,
              text: "230",
              value: "MU",
            },
            {
              allowFreeText: false,
              text: "231",
              value: "LR",
            },
            {
              allowFreeText: false,
              text: "232",
              value: "SL",
            },
            {
              allowFreeText: false,
              text: "233",
              value: "GH",
            },
            {
              allowFreeText: false,
              text: "234",
              value: "NG",
            },
            {
              allowFreeText: false,
              text: "235",
              value: "TD",
            },
            {
              allowFreeText: false,
              text: "236",
              value: "CF",
            },
            {
              allowFreeText: false,
              text: "237",
              value: "CM",
            },
            {
              allowFreeText: false,
              text: "238",
              value: "CV",
            },
            {
              allowFreeText: false,
              text: "239",
              value: "ST",
            },
            {
              allowFreeText: false,
              text: "240",
              value: "GQ",
            },
            {
              allowFreeText: false,
              text: "241",
              value: "GA",
            },
            {
              allowFreeText: false,
              text: "242",
              value: "CG",
            },
            {
              allowFreeText: false,
              text: "243",
              value: "CD",
            },
            {
              allowFreeText: false,
              text: "244",
              value: "AO",
            },
            {
              allowFreeText: false,
              text: "245",
              value: "GW",
            },
            {
              allowFreeText: false,
              text: "246",
              value: "IO",
            },
            {
              allowFreeText: false,
              text: "248",
              value: "SC",
            },
            {
              allowFreeText: false,
              text: "249",
              value: "SD",
            },
            {
              allowFreeText: false,
              text: "250",
              value: "RW",
            },
            {
              allowFreeText: false,
              text: "251",
              value: "ET",
            },
            {
              allowFreeText: false,
              text: "252",
              value: "SO",
            },
            {
              allowFreeText: false,
              text: "253",
              value: "DJ",
            },
            {
              allowFreeText: false,
              text: "254",
              value: "KE",
            },
            {
              allowFreeText: false,
              text: "255",
              value: "TZ",
            },
            {
              allowFreeText: false,
              text: "256",
              value: "UG",
            },
            {
              allowFreeText: false,
              text: "257",
              value: "BI",
            },
            {
              allowFreeText: false,
              text: "258",
              value: "MZ",
            },
            {
              allowFreeText: false,
              text: "260",
              value: "ZM",
            },
            {
              allowFreeText: false,
              text: "261",
              value: "MG",
            },
            {
              allowFreeText: false,
              text: "262",
              value: "RE",
            },
            {
              allowFreeText: false,
              text: "262",
              value: "YT",
            },
            {
              allowFreeText: false,
              text: "263",
              value: "ZW",
            },
            {
              allowFreeText: false,
              text: "264",
              value: "NA",
            },
            {
              allowFreeText: false,
              text: "265",
              value: "MW",
            },
            {
              allowFreeText: false,
              text: "266",
              value: "LS",
            },
            {
              allowFreeText: false,
              text: "267",
              value: "BW",
            },
            {
              allowFreeText: false,
              text: "268",
              value: "SZ",
            },
            {
              allowFreeText: false,
              text: "269",
              value: "KM",
            },
            {
              allowFreeText: false,
              text: "27",
              value: "ZA",
            },
            {
              allowFreeText: false,
              text: "290",
              value: "SH",
            },
            {
              allowFreeText: false,
              text: "291",
              value: "ER",
            },
            {
              allowFreeText: false,
              text: "297",
              value: "AW",
            },
            {
              allowFreeText: false,
              text: "298",
              value: "FO",
            },
            {
              allowFreeText: false,
              text: "299",
              value: "GL",
            },
            {
              allowFreeText: false,
              text: "30",
              value: "GR",
            },
            {
              allowFreeText: false,
              text: "31",
              value: "NL",
            },
            {
              allowFreeText: false,
              text: "32",
              value: "BE",
            },
            {
              allowFreeText: false,
              text: "33",
              value: "FR",
            },
            {
              allowFreeText: false,
              text: "34",
              value: "ES",
            },
            {
              allowFreeText: false,
              text: "350",
              value: "GI",
            },
            {
              allowFreeText: false,
              text: "351",
              value: "PT",
            },
            {
              allowFreeText: false,
              text: "352",
              value: "LU",
            },
            {
              allowFreeText: false,
              text: "353",
              value: "IE",
            },
            {
              allowFreeText: false,
              text: "354",
              value: "IS",
            },
            {
              allowFreeText: false,
              text: "355",
              value: "AL",
            },
            {
              allowFreeText: false,
              text: "356",
              value: "MT",
            },
            {
              allowFreeText: false,
              text: "357",
              value: "CY",
            },
            {
              allowFreeText: false,
              text: "358",
              value: "AX",
            },
            {
              allowFreeText: false,
              text: "358",
              value: "FI",
            },
            {
              allowFreeText: false,
              text: "359",
              value: "BG",
            },
            {
              allowFreeText: false,
              text: "36",
              value: "HU",
            },
            {
              allowFreeText: false,
              text: "370",
              value: "LT",
            },
            {
              allowFreeText: false,
              text: "371",
              value: "LV",
            },
            {
              allowFreeText: false,
              text: "372",
              value: "EE",
            },
            {
              allowFreeText: false,
              text: "373",
              value: "MD",
            },
            {
              allowFreeText: false,
              text: "374",
              value: "AM",
            },
            {
              allowFreeText: false,
              text: "375",
              value: "BY",
            },
            {
              allowFreeText: false,
              text: "376",
              value: "AD",
            },
            {
              allowFreeText: false,
              text: "377",
              value: "MC",
            },
            {
              allowFreeText: false,
              text: "378",
              value: "SM",
            },
            {
              allowFreeText: false,
              text: "380",
              value: "UA",
            },
            {
              allowFreeText: false,
              text: "381",
              value: "RS",
            },
            {
              allowFreeText: false,
              text: "382",
              value: "ME",
            },
            {
              allowFreeText: false,
              text: "383",
              value: "XK",
            },
            {
              allowFreeText: false,
              text: "385",
              value: "HR",
            },
            {
              allowFreeText: false,
              text: "386",
              value: "SI",
            },
            {
              allowFreeText: false,
              text: "387",
              value: "BA",
            },
            {
              allowFreeText: false,
              text: "389",
              value: "MK",
            },
            {
              allowFreeText: false,
              text: "39",
              value: "IT",
            },
            {
              allowFreeText: false,
              text: "39",
              value: "VA",
            },
            {
              allowFreeText: false,
              text: "40",
              value: "RO",
            },
            {
              allowFreeText: false,
              text: "41",
              value: "CH",
            },
            {
              allowFreeText: false,
              text: "420",
              value: "CZ",
            },
            {
              allowFreeText: false,
              text: "421",
              value: "SK",
            },
            {
              allowFreeText: false,
              text: "423",
              value: "LI",
            },
            {
              allowFreeText: false,
              text: "43",
              value: "AT",
            },
            {
              allowFreeText: false,
              text: "44",
              value: "GB",
            },
            {
              allowFreeText: false,
              text: "44",
              value: "GG",
            },
            {
              allowFreeText: false,
              text: "44",
              value: "IM",
            },
            {
              allowFreeText: false,
              text: "44",
              value: "JE",
            },
            {
              allowFreeText: false,
              text: "45",
              value: "DK",
            },
            {
              allowFreeText: false,
              text: "46",
              value: "SE",
            },
            {
              allowFreeText: false,
              text: "47",
              value: "NO",
            },
            {
              allowFreeText: false,
              text: "47",
              value: "SJ",
            },
            {
              allowFreeText: false,
              text: "48",
              value: "PL",
            },
            {
              allowFreeText: false,
              text: "49",
              value: "DE",
            },
            {
              allowFreeText: false,
              text: "500",
              value: "FK",
            },
            {
              allowFreeText: false,
              text: "501",
              value: "BZ",
            },
            {
              allowFreeText: false,
              text: "502",
              value: "GT",
            },
            {
              allowFreeText: false,
              text: "503",
              value: "SV",
            },
            {
              allowFreeText: false,
              text: "504",
              value: "HN",
            },
            {
              allowFreeText: false,
              text: "505",
              value: "NI",
            },
            {
              allowFreeText: false,
              text: "506",
              value: "CR",
            },
            {
              allowFreeText: false,
              text: "507",
              value: "PA",
            },
            {
              allowFreeText: false,
              text: "508",
              value: "PM",
            },
            {
              allowFreeText: false,
              text: "509",
              value: "HT",
            },
            {
              allowFreeText: false,
              text: "51",
              value: "PE",
            },
            {
              allowFreeText: false,
              text: "52",
              value: "MX",
            },
            {
              allowFreeText: false,
              text: "53",
              value: "CU",
            },
            {
              allowFreeText: false,
              text: "54",
              value: "AR",
            },
            {
              allowFreeText: false,
              text: "55",
              value: "BR",
            },
            {
              allowFreeText: false,
              text: "56",
              value: "CL",
            },
            {
              allowFreeText: false,
              text: "57",
              value: "CO",
            },
            {
              allowFreeText: false,
              text: "58",
              value: "VE",
            },
            {
              allowFreeText: false,
              text: "590",
              value: "BL",
            },
            {
              allowFreeText: false,
              text: "590",
              value: "GP",
            },
            {
              allowFreeText: false,
              text: "590",
              value: "MF",
            },
            {
              allowFreeText: false,
              text: "591",
              value: "BO",
            },
            {
              allowFreeText: false,
              text: "592",
              value: "GY",
            },
            {
              allowFreeText: false,
              text: "593",
              value: "EC",
            },
            {
              allowFreeText: false,
              text: "594",
              value: "GF",
            },
            {
              allowFreeText: false,
              text: "595",
              value: "PY",
            },
            {
              allowFreeText: false,
              text: "596",
              value: "MQ",
            },
            {
              allowFreeText: false,
              text: "597",
              value: "SR",
            },
            {
              allowFreeText: false,
              text: "598",
              value: "UY",
            },
            {
              allowFreeText: false,
              text: "599",
              value: "BQ",
            },
            {
              allowFreeText: false,
              text: "599",
              value: "CW",
            },
            {
              allowFreeText: false,
              text: "60",
              value: "MY",
            },
            {
              allowFreeText: false,
              text: "61",
              value: "AU",
            },
            {
              allowFreeText: false,
              text: "61",
              value: "CC",
            },
            {
              allowFreeText: false,
              text: "61",
              value: "CX",
            },
            {
              allowFreeText: false,
              text: "62",
              value: "ID",
            },
            {
              allowFreeText: false,
              text: "63",
              value: "PH",
            },
            {
              allowFreeText: false,
              text: "64",
              value: "NZ",
            },
            {
              allowFreeText: false,
              text: "65",
              value: "SG",
            },
            {
              allowFreeText: false,
              text: "66",
              value: "TH",
            },
            {
              allowFreeText: false,
              text: "670",
              value: "TL",
            },
            {
              allowFreeText: false,
              text: "672",
              value: "NF",
            },
            {
              allowFreeText: false,
              text: "673",
              value: "BN",
            },
            {
              allowFreeText: false,
              text: "674",
              value: "NR",
            },
            {
              allowFreeText: false,
              text: "675",
              value: "PG",
            },
            {
              allowFreeText: false,
              text: "676",
              value: "TO",
            },
            {
              allowFreeText: false,
              text: "677",
              value: "SB",
            },
            {
              allowFreeText: false,
              text: "678",
              value: "VU",
            },
            {
              allowFreeText: false,
              text: "679",
              value: "FJ",
            },
            {
              allowFreeText: false,
              text: "680",
              value: "PW",
            },
            {
              allowFreeText: false,
              text: "681",
              value: "WF",
            },
            {
              allowFreeText: false,
              text: "682",
              value: "CK",
            },
            {
              allowFreeText: false,
              text: "683",
              value: "NU",
            },
            {
              allowFreeText: false,
              text: "685",
              value: "WS",
            },
            {
              allowFreeText: false,
              text: "686",
              value: "KI",
            },
            {
              allowFreeText: false,
              text: "687",
              value: "NC",
            },
            {
              allowFreeText: false,
              text: "688",
              value: "TV",
            },
            {
              allowFreeText: false,
              text: "689",
              value: "PF",
            },
            {
              allowFreeText: false,
              text: "690",
              value: "TK",
            },
            {
              allowFreeText: false,
              text: "691",
              value: "FM",
            },
            {
              allowFreeText: false,
              text: "692",
              value: "MH",
            },
            {
              allowFreeText: false,
              text: "7",
              value: "KZ",
            },
            {
              allowFreeText: false,
              text: "7",
              value: "RU",
            },
            {
              allowFreeText: false,
              text: "81",
              value: "JP",
            },
            {
              allowFreeText: false,
              text: "82",
              value: "KR",
            },
            {
              allowFreeText: false,
              text: "84",
              value: "VN",
            },
            {
              allowFreeText: false,
              text: "850",
              value: "KP",
            },
            {
              allowFreeText: false,
              text: "852",
              value: "HK",
            },
            {
              allowFreeText: false,
              text: "853",
              value: "MO",
            },
            {
              allowFreeText: false,
              text: "855",
              value: "KH",
            },
            {
              allowFreeText: false,
              text: "856",
              value: "LA",
            },
            {
              allowFreeText: false,
              text: "86",
              value: "CN",
            },
            {
              allowFreeText: false,
              text: "880",
              value: "BD",
            },
            {
              allowFreeText: false,
              text: "886",
              value: "TW",
            },
            {
              allowFreeText: false,
              text: "90",
              value: "TR",
            },
            {
              allowFreeText: false,
              text: "91",
              value: "IN",
            },
            {
              allowFreeText: false,
              text: "92",
              value: "PK",
            },
            {
              allowFreeText: false,
              text: "93",
              value: "AF",
            },
            {
              allowFreeText: false,
              text: "94",
              value: "LK",
            },
            {
              allowFreeText: false,
              text: "95",
              value: "MM",
            },
            {
              allowFreeText: false,
              text: "960",
              value: "MV",
            },
            {
              allowFreeText: false,
              text: "961",
              value: "LB",
            },
            {
              allowFreeText: false,
              text: "962",
              value: "JO",
            },
            {
              allowFreeText: false,
              text: "963",
              value: "SY",
            },
            {
              allowFreeText: false,
              text: "964",
              value: "IQ",
            },
            {
              allowFreeText: false,
              text: "965",
              value: "KW",
            },
            {
              allowFreeText: false,
              text: "966",
              value: "SA",
            },
            {
              allowFreeText: false,
              text: "967",
              value: "YE",
            },
            {
              allowFreeText: false,
              text: "968",
              value: "OM",
            },
            {
              allowFreeText: false,
              text: "970",
              value: "PS",
            },
            {
              allowFreeText: false,
              text: "971",
              value: "AE",
            },
            {
              allowFreeText: false,
              text: "972",
              value: "IL",
            },
            {
              allowFreeText: false,
              text: "973",
              value: "BH",
            },
            {
              allowFreeText: false,
              text: "974",
              value: "QA",
            },
            {
              allowFreeText: false,
              text: "975",
              value: "BT",
            },
            {
              allowFreeText: false,
              text: "976",
              value: "MN",
            },
            {
              allowFreeText: false,
              text: "977",
              value: "NP",
            },
            {
              allowFreeText: false,
              text: "98",
              value: "IR",
            },
            {
              allowFreeText: false,
              text: "992",
              value: "TJ",
            },
            {
              allowFreeText: false,
              text: "993",
              value: "TM",
            },
            {
              allowFreeText: false,
              text: "994",
              value: "AZ",
            },
            {
              allowFreeText: false,
              text: "995",
              value: "GE",
            },
            {
              allowFreeText: false,
              text: "996",
              value: "KG",
            },
            {
              allowFreeText: false,
              text: "998",
              value: "UZ",
            },
          ],
          validators: [],
        },
        {
          disabled: false,
          id: "Countries",
          options: [
            {
              allowFreeText: false,
              text: "Afghanistan",
              value: "AF",
            },
            {
              allowFreeText: false,
              text: "Ãland Islands",
              value: "AX",
            },
            {
              allowFreeText: false,
              text: "Albania",
              value: "AL",
            },
            {
              allowFreeText: false,
              text: "Algeria",
              value: "DZ",
            },
            {
              allowFreeText: false,
              text: "American Samoa",
              value: "AS",
            },
            {
              allowFreeText: false,
              text: "Andorra",
              value: "AD",
            },
            {
              allowFreeText: false,
              text: "Angola",
              value: "AO",
            },
            {
              allowFreeText: false,
              text: "Anguilla",
              value: "AI",
            },
            {
              allowFreeText: false,
              text: "Antarctica",
              value: "AQ",
            },
            {
              allowFreeText: false,
              text: "Antigua",
              value: "AG",
            },
            {
              allowFreeText: false,
              text: "Argentina",
              value: "AR",
            },
            {
              allowFreeText: false,
              text: "Armenia",
              value: "AM",
            },
            {
              allowFreeText: false,
              text: "Aruba",
              value: "AW",
            },
            {
              allowFreeText: false,
              text: "Australia",
              value: "AU",
            },
            {
              allowFreeText: false,
              text: "Austria",
              value: "AT",
            },
            {
              allowFreeText: false,
              text: "Azerbaijan",
              value: "AZ",
            },
            {
              allowFreeText: false,
              text: "Bahamas",
              value: "BS",
            },
            {
              allowFreeText: false,
              text: "Bahrain",
              value: "BH",
            },
            {
              allowFreeText: false,
              text: "Bangladesh",
              value: "BD",
            },
            {
              allowFreeText: false,
              text: "Barbados",
              value: "BB",
            },
            {
              allowFreeText: false,
              text: "Belarus",
              value: "BY",
            },
            {
              allowFreeText: false,
              text: "Belgium",
              value: "BE",
            },
            {
              allowFreeText: false,
              text: "Belize",
              value: "BZ",
            },
            {
              allowFreeText: false,
              text: "Benin",
              value: "BJ",
            },
            {
              allowFreeText: false,
              text: "Bermuda",
              value: "BM",
            },
            {
              allowFreeText: false,
              text: "Bhutan",
              value: "BT",
            },
            {
              allowFreeText: false,
              text: "Bolivia",
              value: "BO",
            },
            {
              allowFreeText: false,
              text: "Bonaire",
              value: "BQ",
            },
            {
              allowFreeText: false,
              text: "Bosnia and Herzegovina",
              value: "BA",
            },
            {
              allowFreeText: false,
              text: "Botswana",
              value: "BW",
            },
            {
              allowFreeText: false,
              text: "Bouvet Island",
              value: "BV",
            },
            {
              allowFreeText: false,
              text: "Brazil",
              value: "BR",
            },
            {
              allowFreeText: false,
              text: "British Indian Ocean Territory",
              value: "IO",
            },
            {
              allowFreeText: false,
              text: "Brunei Darussalam",
              value: "BN",
            },
            {
              allowFreeText: false,
              text: "Bulgaria",
              value: "BG",
            },
            {
              allowFreeText: false,
              text: "Burkina Faso",
              value: "BF",
            },
            {
              allowFreeText: false,
              text: "Burundi",
              value: "BI",
            },
            {
              allowFreeText: false,
              text: "Cape Verde",
              value: "CV",
            },
            {
              allowFreeText: false,
              text: "Cambodia",
              value: "KH",
            },
            {
              allowFreeText: false,
              text: "Cameroon",
              value: "CM",
            },
            {
              allowFreeText: false,
              text: "Canada",
              value: "CA",
            },
            {
              allowFreeText: false,
              text: "Cayman Islands",
              value: "KY",
            },
            {
              allowFreeText: false,
              text: "Central African Republic",
              value: "CF",
            },
            {
              allowFreeText: false,
              text: "Chad",
              value: "TD",
            },
            {
              allowFreeText: false,
              text: "Chile",
              value: "CL",
            },
            {
              allowFreeText: false,
              text: "China",
              value: "CN",
            },
            {
              allowFreeText: false,
              text: "Christmas Island",
              value: "CX",
            },
            {
              allowFreeText: false,
              text: "Cocos Islands",
              value: "CC",
            },
            {
              allowFreeText: false,
              text: "Colombia",
              value: "CO",
            },
            {
              allowFreeText: false,
              text: "Comoros",
              value: "KM",
            },
            {
              allowFreeText: false,
              text: "Congo",
              value: "CG",
            },
            {
              allowFreeText: false,
              text: "Congo Democratic Republic",
              value: "CD",
            },
            {
              allowFreeText: false,
              text: "Cook Islands",
              value: "CK",
            },
            {
              allowFreeText: false,
              text: "Costa Rica",
              value: "CR",
            },
            {
              allowFreeText: false,
              text: "Cote d'Ivoire",
              value: "CI",
            },
            {
              allowFreeText: false,
              text: "Croatia",
              value: "HR",
            },
            {
              allowFreeText: false,
              text: "Cuba",
              value: "CU",
            },
            {
              allowFreeText: false,
              text: "Curaçao",
              value: "CW",
            },
            {
              allowFreeText: false,
              text: "Cyprus",
              value: "CY",
            },
            {
              allowFreeText: false,
              text: "Czech Republic",
              value: "CZ",
            },
            {
              allowFreeText: false,
              text: "Denmark",
              value: "DK",
            },
            {
              allowFreeText: false,
              text: "Djibouti",
              value: "DJ",
            },
            {
              allowFreeText: false,
              text: "Dominica",
              value: "DM",
            },
            {
              allowFreeText: false,
              text: "Dominican Republic",
              value: "DO",
            },
            {
              allowFreeText: false,
              text: "Ecuador",
              value: "EC",
            },
            {
              allowFreeText: false,
              text: "Egypt",
              value: "EG",
            },
            {
              allowFreeText: false,
              text: "El Salvador",
              value: "SV",
            },
            {
              allowFreeText: false,
              text: "Equatorial Guinea",
              value: "GQ",
            },
            {
              allowFreeText: false,
              text: "Eritrea",
              value: "ER",
            },
            {
              allowFreeText: false,
              text: "Estonia",
              value: "EE",
            },
            {
              allowFreeText: false,
              text: "Ethiopia",
              value: "ET",
            },
            {
              allowFreeText: false,
              text: "Falkland Islands",
              value: "FK",
            },
            {
              allowFreeText: false,
              text: "Faroe Islands",
              value: "FO",
            },
            {
              allowFreeText: false,
              text: "Fiji",
              value: "FJ",
            },
            {
              allowFreeText: false,
              text: "Finland",
              value: "FI",
            },
            {
              allowFreeText: false,
              text: "France",
              value: "FR",
            },
            {
              allowFreeText: false,
              text: "French Guiana",
              value: "GF",
            },
            {
              allowFreeText: false,
              text: "French Polynesia",
              value: "PF",
            },
            {
              allowFreeText: false,
              text: "French Southern Territories",
              value: "TF",
            },
            {
              allowFreeText: false,
              text: "Gabon",
              value: "GA",
            },
            {
              allowFreeText: false,
              text: "Gambia",
              value: "GM",
            },
            {
              allowFreeText: false,
              text: "Georgia",
              value: "GE",
            },
            {
              allowFreeText: false,
              text: "Germany",
              value: "DE",
            },
            {
              allowFreeText: false,
              text: "Ghana",
              value: "GH",
            },
            {
              allowFreeText: false,
              text: "Gibraltar",
              value: "GI",
            },
            {
              allowFreeText: false,
              text: "Greece",
              value: "GR",
            },
            {
              allowFreeText: false,
              text: "Greenland",
              value: "GL",
            },
            {
              allowFreeText: false,
              text: "Grenada",
              value: "GD",
            },
            {
              allowFreeText: false,
              text: "Guadeloupe",
              value: "GP",
            },
            {
              allowFreeText: false,
              text: "Guam",
              value: "GU",
            },
            {
              allowFreeText: false,
              text: "Guatemala",
              value: "GT",
            },
            {
              allowFreeText: false,
              text: "Guernsey",
              value: "GG",
            },
            {
              allowFreeText: false,
              text: "Guinea",
              value: "GN",
            },
            {
              allowFreeText: false,
              text: "Guinea-Bissau",
              value: "GW",
            },
            {
              allowFreeText: false,
              text: "Guyana",
              value: "GY",
            },
            {
              allowFreeText: false,
              text: "Haiti",
              value: "HT",
            },
            {
              allowFreeText: false,
              text: "Heard and McDonald Islands",
              value: "HM",
            },
            {
              allowFreeText: false,
              text: "Holy See (Vatican City State)",
              value: "VA",
            },
            {
              allowFreeText: false,
              text: "Honduras",
              value: "HN",
            },
            {
              allowFreeText: false,
              text: "Hong Kong",
              value: "HK",
            },
            {
              allowFreeText: false,
              text: "Hungary",
              value: "HU",
            },
            {
              allowFreeText: false,
              text: "Iceland",
              value: "IS",
            },
            {
              allowFreeText: false,
              text: "India",
              value: "IN",
            },
            {
              allowFreeText: false,
              text: "Indonesia",
              value: "ID",
            },
            {
              allowFreeText: false,
              text: "Iran Islamic Republic of",
              value: "IR",
            },
            {
              allowFreeText: false,
              text: "Iraq",
              value: "IQ",
            },
            {
              allowFreeText: false,
              text: "Ireland",
              value: "IE",
            },
            {
              allowFreeText: false,
              text: "Isle of Man",
              value: "IM",
            },
            {
              allowFreeText: false,
              text: "Israel",
              value: "IL",
            },
            {
              allowFreeText: false,
              text: "Italy",
              value: "IT",
            },
            {
              allowFreeText: false,
              text: "Jamaica",
              value: "JM",
            },
            {
              allowFreeText: false,
              text: "Japan",
              value: "JP",
            },
            {
              allowFreeText: false,
              text: "Jersey",
              value: "JE",
            },
            {
              allowFreeText: false,
              text: "Jordan",
              value: "JO",
            },
            {
              allowFreeText: false,
              text: "Kazakhstan",
              value: "KZ",
            },
            {
              allowFreeText: false,
              text: "Kenya",
              value: "KE",
            },
            {
              allowFreeText: false,
              text: "Kiribati",
              value: "KI",
            },
            {
              allowFreeText: false,
              text: "Korea, North",
              value: "KP",
            },
            {
              allowFreeText: false,
              text: "Korea, South",
              value: "KR",
            },
            {
              allowFreeText: false,
              text: "Kosovo",
              value: "XK",
            },
            {
              allowFreeText: false,
              text: "Kuwait",
              value: "KW",
            },
            {
              allowFreeText: false,
              text: "Kyrgyzstan",
              value: "KG",
            },
            {
              allowFreeText: false,
              text: "Laos",
              value: "LA",
            },
            {
              allowFreeText: false,
              text: "Latvia",
              value: "LV",
            },
            {
              allowFreeText: false,
              text: "Lebanon",
              value: "LB",
            },
            {
              allowFreeText: false,
              text: "Lesotho",
              value: "LS",
            },
            {
              allowFreeText: false,
              text: "Liberia",
              value: "LR",
            },
            {
              allowFreeText: false,
              text: "Libya",
              value: "LY",
            },
            {
              allowFreeText: false,
              text: "Liechtenstein",
              value: "LI",
            },
            {
              allowFreeText: false,
              text: "Lithuania",
              value: "LT",
            },
            {
              allowFreeText: false,
              text: "Luxembourg",
              value: "LU",
            },
            {
              allowFreeText: false,
              text: "Macao",
              value: "MO",
            },
            {
              allowFreeText: false,
              text: "Madagascar",
              value: "MG",
            },
            {
              allowFreeText: false,
              text: "Malawi",
              value: "MW",
            },
            {
              allowFreeText: false,
              text: "Malaysia",
              value: "MY",
            },
            {
              allowFreeText: false,
              text: "Maldives",
              value: "MV",
            },
            {
              allowFreeText: false,
              text: "Mali",
              value: "ML",
            },
            {
              allowFreeText: false,
              text: "Malta",
              value: "MT",
            },
            {
              allowFreeText: false,
              text: "Marshall Islands",
              value: "MH",
            },
            {
              allowFreeText: false,
              text: "Martinique",
              value: "MQ",
            },
            {
              allowFreeText: false,
              text: "Mauritania",
              value: "MR",
            },
            {
              allowFreeText: false,
              text: "Mauritius",
              value: "MU",
            },
            {
              allowFreeText: false,
              text: "Mayotte",
              value: "YT",
            },
            {
              allowFreeText: false,
              text: "Mexico",
              value: "MX",
            },
            {
              allowFreeText: false,
              text: "Micronesia",
              value: "FM",
            },
            {
              allowFreeText: false,
              text: "Moldova, Republic of",
              value: "MD",
            },
            {
              allowFreeText: false,
              text: "Monaco",
              value: "MC",
            },
            {
              allowFreeText: false,
              text: "Mongolia",
              value: "MN",
            },
            {
              allowFreeText: false,
              text: "Montenegro",
              value: "ME",
            },
            {
              allowFreeText: false,
              text: "Montserrat",
              value: "MS",
            },
            {
              allowFreeText: false,
              text: "Morocco",
              value: "MA",
            },
            {
              allowFreeText: false,
              text: "Mozambique",
              value: "MZ",
            },
            {
              allowFreeText: false,
              text: "Myanmar",
              value: "MM",
            },
            {
              allowFreeText: false,
              text: "Namibia",
              value: "NA",
            },
            {
              allowFreeText: false,
              text: "Nauru",
              value: "NR",
            },
            {
              allowFreeText: false,
              text: "Nepal",
              value: "NP",
            },
            {
              allowFreeText: false,
              text: "Netherlands",
              value: "NL",
            },
            {
              allowFreeText: false,
              text: "Netherlands Antilles",
              value: "AN",
            },
            {
              allowFreeText: false,
              text: "New Caledonia",
              value: "NC",
            },
            {
              allowFreeText: false,
              text: "New Zealand",
              value: "NZ",
            },
            {
              allowFreeText: false,
              text: "Nicaragua",
              value: "NI",
            },
            {
              allowFreeText: false,
              text: "Niger Republic of",
              value: "NE",
            },
            {
              allowFreeText: false,
              text: "Nigeria",
              value: "NG",
            },
            {
              allowFreeText: false,
              text: "Niue",
              value: "NU",
            },
            {
              allowFreeText: false,
              text: "Norfolk Island",
              value: "NF",
            },
            {
              allowFreeText: false,
              text: "North Macedonia",
              value: "MK",
            },
            {
              allowFreeText: false,
              text: "Northern Mariana Islands",
              value: "MP",
            },
            {
              allowFreeText: false,
              text: "Norway",
              value: "NO",
            },
            {
              allowFreeText: false,
              text: "Oman",
              value: "OM",
            },
            {
              allowFreeText: false,
              text: "Pakistan",
              value: "PK",
            },
            {
              allowFreeText: false,
              text: "Palau",
              value: "PW",
            },
            {
              allowFreeText: false,
              text: "Palestine",
              value: "PS",
            },
            {
              allowFreeText: false,
              text: "Panama",
              value: "PA",
            },
            {
              allowFreeText: false,
              text: "Papua New Guinea",
              value: "PG",
            },
            {
              allowFreeText: false,
              text: "Paraguay",
              value: "PY",
            },
            {
              allowFreeText: false,
              text: "Peru",
              value: "PE",
            },
            {
              allowFreeText: false,
              text: "Philippines",
              value: "PH",
            },
            {
              allowFreeText: false,
              text: "Pitcairn",
              value: "PN",
            },
            {
              allowFreeText: false,
              text: "Poland",
              value: "PL",
            },
            {
              allowFreeText: false,
              text: "Portugal",
              value: "PT",
            },
            {
              allowFreeText: false,
              text: "Puerto Rico",
              value: "PR",
            },
            {
              allowFreeText: false,
              text: "Qatar",
              value: "QA",
            },
            {
              allowFreeText: false,
              text: "Reunion",
              value: "RE",
            },
            {
              allowFreeText: false,
              text: "Romania",
              value: "RO",
            },
            {
              allowFreeText: false,
              text: "Russia",
              value: "RU",
            },
            {
              allowFreeText: false,
              text: "Rwanda",
              value: "RW",
            },
            {
              allowFreeText: false,
              text: "Saint Barthelemy",
              value: "BL",
            },
            {
              allowFreeText: false,
              text: "Saint Helenian",
              value: "SH",
            },
            {
              allowFreeText: false,
              text: "Saint Kitts And Nevis",
              value: "KN",
            },
            {
              allowFreeText: false,
              text: "Saint Lucia",
              value: "LC",
            },
            {
              allowFreeText: false,
              text: "Saint Martin",
              value: "MF",
            },
            {
              allowFreeText: false,
              text: "Saint Pierre and Miquelon",
              value: "PM",
            },
            {
              allowFreeText: false,
              text: "Saint Vincent and the Grenadin",
              value: "VC",
            },
            {
              allowFreeText: false,
              text: "Samoa",
              value: "WS",
            },
            {
              allowFreeText: false,
              text: "San Marino",
              value: "SM",
            },
            {
              allowFreeText: false,
              text: "Sao tome and principe",
              value: "ST",
            },
            {
              allowFreeText: false,
              text: "Saudi Arabia",
              value: "SA",
            },
            {
              allowFreeText: false,
              text: "Senegal",
              value: "SN",
            },
            {
              allowFreeText: false,
              text: "Serbia",
              value: "RS",
            },
            {
              allowFreeText: false,
              text: "Seychelles",
              value: "SC",
            },
            {
              allowFreeText: false,
              text: "Sierra Leone",
              value: "SL",
            },
            {
              allowFreeText: false,
              text: "Singapore",
              value: "SG",
            },
            {
              allowFreeText: false,
              text: "Sint Maarten",
              value: "SX",
            },
            {
              allowFreeText: false,
              text: "Slovakia",
              value: "SK",
            },
            {
              allowFreeText: false,
              text: "Slovenia",
              value: "SI",
            },
            {
              allowFreeText: false,
              text: "Solomon Islands",
              value: "SB",
            },
            {
              allowFreeText: false,
              text: "Somalia",
              value: "SO",
            },
            {
              allowFreeText: false,
              text: "South Africa",
              value: "ZA",
            },
            {
              allowFreeText: false,
              text: "South Georgia",
              value: "GS",
            },
            {
              allowFreeText: false,
              text: "South Sudan",
              value: "SS",
            },
            {
              allowFreeText: false,
              text: "Spain",
              value: "ES",
            },
            {
              allowFreeText: false,
              text: "Sri Lanka",
              value: "LK",
            },
            {
              allowFreeText: false,
              text: "Sudan",
              value: "SD",
            },
            {
              allowFreeText: false,
              text: "Suriname",
              value: "SR",
            },
            {
              allowFreeText: false,
              text: "Svalbard",
              value: "SJ",
            },
            {
              allowFreeText: false,
              text: "Eswatini",
              value: "SZ",
            },
            {
              allowFreeText: false,
              text: "Sweden",
              value: "SE",
            },
            {
              allowFreeText: false,
              text: "Switzerland",
              value: "CH",
            },
            {
              allowFreeText: false,
              text: "Syria",
              value: "SY",
            },
            {
              allowFreeText: false,
              text: "Taiwan",
              value: "TW",
            },
            {
              allowFreeText: false,
              text: "Tajikistan",
              value: "TJ",
            },
            {
              allowFreeText: false,
              text: "Tanzania",
              value: "TZ",
            },
            {
              allowFreeText: false,
              text: "Thailand",
              value: "TH",
            },
            {
              allowFreeText: false,
              text: "Timor-Leste",
              value: "TL",
            },
            {
              allowFreeText: false,
              text: "Togo",
              value: "TG",
            },
            {
              allowFreeText: false,
              text: "Tokelau",
              value: "TK",
            },
            {
              allowFreeText: false,
              text: "Tonga",
              value: "TO",
            },
            {
              allowFreeText: false,
              text: "Trinidad",
              value: "TT",
            },
            {
              allowFreeText: false,
              text: "Tunisia",
              value: "TN",
            },
            {
              allowFreeText: false,
              text: "Turkey",
              value: "TR",
            },
            {
              allowFreeText: false,
              text: "Turkmenistan",
              value: "TM",
            },
            {
              allowFreeText: false,
              text: "Turks and Caicos",
              value: "TC",
            },
            {
              allowFreeText: false,
              text: "Tuvalu",
              value: "TV",
            },
            {
              allowFreeText: false,
              text: "Uganda",
              value: "UG",
            },
            {
              allowFreeText: false,
              text: "Ukraine",
              value: "UA",
            },
            {
              allowFreeText: false,
              text: "United Arab Emirates",
              value: "AE",
            },
            {
              allowFreeText: false,
              text: "United Kingdom",
              value: "GB",
            },
            {
              allowFreeText: false,
              text: "United States",
              value: "US",
            },
            {
              allowFreeText: false,
              text: "United States Minor Outlying Islands",
              value: "UM",
            },
            {
              allowFreeText: false,
              text: "Uruguay",
              value: "UY",
            },
            {
              allowFreeText: false,
              text: "Uzbekistan",
              value: "UZ",
            },
            {
              allowFreeText: false,
              text: "Vanuatu",
              value: "VU",
            },
            {
              allowFreeText: false,
              text: "Venezuela",
              value: "VE",
            },
            {
              allowFreeText: false,
              text: "Vietnam",
              value: "VN",
            },
            {
              allowFreeText: false,
              text: "British Virgin Islands",
              value: "VG",
            },
            {
              allowFreeText: false,
              text: "Virgin Islands, US",
              value: "VI",
            },
            {
              allowFreeText: false,
              text: "Wallis & Futuna",
              value: "WF",
            },
            {
              allowFreeText: false,
              text: "Western Sahara",
              value: "EH",
            },
            {
              allowFreeText: false,
              text: "Yemen",
              value: "YE",
            },
            {
              allowFreeText: false,
              text: "Zambia",
              value: "ZM",
            },
            {
              allowFreeText: false,
              text: "Zimbabwe",
              value: "ZW",
            },
          ],
          validators: [],
        },
        {
          disabled: false,
          id: "SupportedCountries",
          options: [
            {
              allowFreeText: false,
              jsonContent:
                '{"SoftMarketingEnabled":true,"SoftMarketingPromptEnabled":false}',
              text: "Australia",
              value: "AU",
            },
            {
              allowFreeText: false,
              text: "Austria",
              value: "AT",
            },
            {
              allowFreeText: false,
              text: "Belgium",
              value: "BE",
            },
            {
              allowFreeText: false,
              text: "Bulgaria",
              value: "BG",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"SoftMarketingEnabled":true,"SoftMarketingPromptEnabled":false}',
              text: "Canada",
              value: "CA",
            },
            {
              allowFreeText: false,
              text: "Croatia",
              value: "HR",
            },
            {
              allowFreeText: false,
              text: "Cyprus",
              value: "CY",
            },
            {
              allowFreeText: false,
              text: "Czech Republic",
              value: "CZ",
            },
            {
              allowFreeText: false,
              text: "Denmark",
              value: "DK",
            },
            {
              allowFreeText: false,
              text: "Estonia",
              value: "EE",
            },
            {
              allowFreeText: false,
              text: "Finland",
              value: "FI",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"SoftMarketingEnabled":true,"SoftMarketingPromptEnabled":false}',
              text: "France",
              value: "FR",
            },
            {
              allowFreeText: false,
              text: "Germany",
              value: "DE",
            },
            {
              allowFreeText: false,
              text: "Gibraltar",
              value: "GI",
            },
            {
              allowFreeText: false,
              text: "Greece",
              value: "GR",
            },
            {
              allowFreeText: false,
              text: "Guernsey",
              value: "GG",
            },
            {
              allowFreeText: false,
              text: "Hungary",
              value: "HU",
            },
            {
              allowFreeText: false,
              text: "Ireland",
              value: "IE",
            },
            {
              allowFreeText: false,
              text: "Isle of Man",
              value: "IM",
            },
            {
              allowFreeText: false,
              text: "Italy",
              value: "IT",
            },
            {
              allowFreeText: false,
              text: "Jersey",
              value: "JE",
            },
            {
              allowFreeText: false,
              text: "Latvia",
              value: "LV",
            },
            {
              allowFreeText: false,
              text: "Liechtenstein",
              value: "LI",
            },
            {
              allowFreeText: false,
              text: "Lithuania",
              value: "LT",
            },
            {
              allowFreeText: false,
              text: "Luxembourg",
              value: "LU",
            },
            {
              allowFreeText: false,
              text: "Malta",
              value: "MT",
            },
            {
              allowFreeText: false,
              text: "Netherlands",
              value: "NL",
            },
            {
              allowFreeText: false,
              text: "New Zealand",
              value: "NZ",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"SoftMarketingEnabled":true,"SoftMarketingPromptEnabled":false}',
              text: "Norway",
              value: "NO",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"SoftMarketingEnabled":true,"SoftMarketingPromptEnabled":false}',
              text: "Poland",
              value: "PL",
            },
            {
              allowFreeText: false,
              text: "Portugal",
              value: "PT",
            },
            {
              allowFreeText: false,
              text: "Romania",
              value: "RO",
            },
            {
              allowFreeText: false,
              text: "Slovakia",
              value: "SK",
            },
            {
              allowFreeText: false,
              text: "Spain",
              value: "ES",
            },
            {
              allowFreeText: false,
              text: "Sweden",
              value: "SE",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"SoftMarketingEnabled":true,"SoftMarketingPromptEnabled":true}',
              text: "United Kingdom",
              value: "GB",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"SoftMarketingEnabled":true,"SoftMarketingPromptEnabled":false}',
              text: "United States",
              value: "US",
            },
          ],
          validators: [],
        },
        {
          disabled: false,
          fallBack: false,
          id: "currencies",
          options: [
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":2,"IsoCode":"AED","Name":"UAE Dirham","CanBuy":true,"CanSell":true,"SameCurrencySupported":false}',
              text: "Emirati Dirham",
              value: "AED",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":2,"IsoCode":"AUD","Name":"Australian Dollar","CanBuy":true,"CanSell":true,"SameCurrencySupported":false}',
              text: "Australian Dollar",
              value: "AUD",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":2,"IsoCode":"BBD","Name":"Barbados Dollar","CanBuy":true,"CanSell":false,"SameCurrencySupported":false}',
              text: "Barbadian or Bajan Dollar",
              value: "BBD",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":2,"IsoCode":"BGN","Name":"Bulgarian Lev","CanBuy":true,"CanSell":true,"SameCurrencySupported":false}',
              text: "Bulgarian Lev",
              value: "BGN",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":3,"IsoCode":"BHD","Name":"Bahrani Dinar","CanBuy":true,"CanSell":true,"SameCurrencySupported":false}',
              text: "Bahraini Dinar",
              value: "BHD",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":2,"IsoCode":"BRL","Name":"Brazilian Real","CanBuy":true,"CanSell":false,"SameCurrencySupported":false}',
              text: "Brazilian Real",
              value: "BRL",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":2,"IsoCode":"BSD","Name":"Bahamian Dollar","CanBuy":true,"CanSell":false,"SameCurrencySupported":false}',
              text: "Bahamian Dollar",
              value: "BSD",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":2,"IsoCode":"BWP","Name":"Botswana Pula","CanBuy":true,"CanSell":true,"SameCurrencySupported":false}',
              text: "Botswana Pula",
              value: "BWP",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":2,"IsoCode":"CAD","Name":"Canadian Dollar","CanBuy":true,"CanSell":true,"SameCurrencySupported":false}',
              text: "Canadian Dollar",
              value: "CAD",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":2,"IsoCode":"CHF","Name":"Swiss Franc","CanBuy":true,"CanSell":true,"SameCurrencySupported":false}',
              text: "Swiss Franc",
              value: "CHF",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":2,"IsoCode":"CNY","Name":"Chinese Renminbi","CanBuy":true,"CanSell":true,"SameCurrencySupported":false}',
              text: "Chinese Yuan Renminbi",
              value: "CNY",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":2,"IsoCode":"COP","Name":"Colombian Peso","CanBuy":true,"CanSell":false,"SameCurrencySupported":false}',
              text: "Colombian Peso",
              value: "COP",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":2,"IsoCode":"CVE","Name":"Cape Verdean Escudo","CanBuy":true,"CanSell":false,"SameCurrencySupported":false}',
              text: "Cape Verdean Escudo",
              value: "CVE",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":2,"IsoCode":"CZK","Name":"Czech Koruna","CanBuy":true,"CanSell":true,"SameCurrencySupported":false}',
              text: "Czech Koruna",
              value: "CZK",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":2,"IsoCode":"DKK","Name":"Danish Krone","CanBuy":true,"CanSell":true,"SameCurrencySupported":false}',
              text: "Danish Krone",
              value: "DKK",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":2,"IsoCode":"EGP","Name":"Egyptian Pound","CanBuy":true,"CanSell":false,"SameCurrencySupported":false}',
              text: "Egyptian Pound",
              value: "EGP",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":2,"IsoCode":"EUR","Name":"Euro","CanBuy":true,"CanSell":true,"SameCurrencySupported":false}',
              text: "Euro",
              value: "EUR",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":2,"IsoCode":"FJD","Name":"Fijian Dollar","CanBuy":true,"CanSell":false,"SameCurrencySupported":false}',
              text: "Fijian Dollar",
              value: "FJD",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":2,"IsoCode":"GBP","Name":"Great British Pound","CanBuy":true,"CanSell":true,"SameCurrencySupported":false}',
              text: "British Pound",
              value: "GBP",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":2,"IsoCode":"GHS","Name":"Ghanaian Cedi","CanBuy":true,"CanSell":true,"SameCurrencySupported":false}',
              text: "Ghanaian Cedi",
              value: "GHS",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":2,"IsoCode":"HKD","Name":"Hong Kong Dollar","CanBuy":true,"CanSell":true,"SameCurrencySupported":false}',
              text: "Hong Kong Dollar",
              value: "HKD",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":2,"IsoCode":"HNL","Name":"Honduran Lempira","CanBuy":true,"CanSell":false,"SameCurrencySupported":false}',
              text: "Honduran Lempira",
              value: "HNL",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":2,"IsoCode":"HUF","Name":"Hungarian Forint","CanBuy":true,"CanSell":true,"SameCurrencySupported":false}',
              text: "Hungarian Forint",
              value: "HUF",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":2,"IsoCode":"IDR","Name":"Indonesian Rupiah","CanBuy":true,"CanSell":false,"SameCurrencySupported":false}',
              text: "Indonesian Rupiah",
              value: "IDR",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":2,"IsoCode":"ILS","Name":"Israeli Shekel","CanBuy":true,"CanSell":true,"SameCurrencySupported":false}',
              text: "Israeli Shekel",
              value: "ILS",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":2,"IsoCode":"INR","Name":"Indian Rupee","CanBuy":true,"CanSell":true,"SameCurrencySupported":false}',
              text: "Indian Rupee",
              value: "INR",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":2,"IsoCode":"JMD","Name":"Jamaican Dollar","CanBuy":true,"CanSell":false,"SameCurrencySupported":false}',
              text: "Jamaican Dollar",
              value: "JMD",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":3,"IsoCode":"JOD","Name":"Jordanian Dinar","CanBuy":true,"CanSell":true,"SameCurrencySupported":false}',
              text: "Jordanian Dinar",
              value: "JOD",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":0,"IsoCode":"JPY","Name":"Japanese Yen","CanBuy":true,"CanSell":true,"SameCurrencySupported":false}',
              text: "Japanese Yen",
              value: "JPY",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":2,"IsoCode":"KES","Name":"Kenyan Shilling","CanBuy":true,"CanSell":true,"SameCurrencySupported":false}',
              text: "Kenyan Shilling",
              value: "KES",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":2,"IsoCode":"KHR","Name":"Cambodian Reil","CanBuy":true,"CanSell":false,"SameCurrencySupported":false}',
              text: "Cambodian Riel",
              value: "KHR",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":0,"IsoCode":"KMF","Name":"Comorian Franc","CanBuy":true,"CanSell":false,"SameCurrencySupported":false}',
              text: "Comorian Franc",
              value: "KMF",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":0,"IsoCode":"KRW","Name":"South Korean Won","CanBuy":true,"CanSell":false,"SameCurrencySupported":false}',
              text: "South Korean Won",
              value: "KRW",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":3,"IsoCode":"KWD","Name":"Kuwaiti Dinar","CanBuy":true,"CanSell":true,"SameCurrencySupported":false}',
              text: "Kuwaiti Dinar",
              value: "KWD",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":2,"IsoCode":"LKR","Name":"Sri Lankan Rupee","CanBuy":true,"CanSell":false,"SameCurrencySupported":false}',
              text: "Sri Lankan Rupee",
              value: "LKR",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":2,"IsoCode":"LSL","Name":"Lesotho Loti","CanBuy":true,"CanSell":true,"SameCurrencySupported":false}',
              text: "Basotho Loti",
              value: "LSL",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":2,"IsoCode":"MAD","Name":"Moroccan Dirham","CanBuy":true,"CanSell":false,"SameCurrencySupported":false}',
              text: "Moroccan Dirham",
              value: "MAD",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":2,"IsoCode":"MNT","Name":"Mongolian Tugrik","CanBuy":true,"CanSell":false,"SameCurrencySupported":false}',
              text: "Mongolian Tughrik",
              value: "MNT",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":2,"IsoCode":"MUR","Name":"Mauritian Rupee","CanBuy":true,"CanSell":true,"SameCurrencySupported":false}',
              text: "Mauritian Rupee",
              value: "MUR",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":2,"IsoCode":"MWK","Name":"Malawi Kwacha","CanBuy":false,"CanSell":false,"SameCurrencySupported":false}',
              text: "Malawian Kwacha",
              value: "MWK",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":2,"IsoCode":"MXN","Name":"Mexican Peso","CanBuy":true,"CanSell":true,"SameCurrencySupported":false}',
              text: "Mexican Peso",
              value: "MXN",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":2,"IsoCode":"MYR","Name":"Malaysian Ringgit","CanBuy":true,"CanSell":false,"SameCurrencySupported":false}',
              text: "Malaysian Ringgit",
              value: "MYR",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":2,"IsoCode":"MZN","Name":"Mozambican Metical","CanBuy":true,"CanSell":false,"SameCurrencySupported":false}',
              text: "Mozambican Metical",
              value: "MZN",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":2,"IsoCode":"NAD","Name":"Namibian Dollar","CanBuy":true,"CanSell":false,"SameCurrencySupported":false}',
              text: "Namibian Dollar",
              value: "NAD",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":2,"IsoCode":"NGN","Name":"Nigerian Naira","CanBuy":true,"CanSell":false,"SameCurrencySupported":false}',
              text: "Nigerian Naira",
              value: "NGN",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":2,"IsoCode":"NOK","Name":"Norwegian Krone","CanBuy":true,"CanSell":true,"SameCurrencySupported":false}',
              text: "Norwegian Krone",
              value: "NOK",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":2,"IsoCode":"NPR","Name":"Nepalese Rupee","CanBuy":true,"CanSell":false,"SameCurrencySupported":false}',
              text: "Nepalese Rupee",
              value: "NPR",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":2,"IsoCode":"NZD","Name":"New Zealand Dollar","CanBuy":true,"CanSell":true,"SameCurrencySupported":false}',
              text: "New Zealand Dollar",
              value: "NZD",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":3,"IsoCode":"OMR","Name":"Omani Rial","CanBuy":true,"CanSell":true,"SameCurrencySupported":false}',
              text: "Omani Rial",
              value: "OMR",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":2,"IsoCode":"PEN","Name":"Peruvian Sol","CanBuy":true,"CanSell":false,"SameCurrencySupported":false}',
              text: "Peruvian Sol",
              value: "PEN",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":2,"IsoCode":"PHP","Name":"Philippine Peso","CanBuy":true,"CanSell":true,"SameCurrencySupported":false}',
              text: "Philippine Peso",
              value: "PHP",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":2,"IsoCode":"PKR","Name":"Pakistani Rupee","CanBuy":true,"CanSell":true,"SameCurrencySupported":false}',
              text: "Pakistani Rupee",
              value: "PKR",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":2,"IsoCode":"PLN","Name":"Polish Zloty","CanBuy":true,"CanSell":true,"SameCurrencySupported":false}',
              text: "Polish Zloty",
              value: "PLN",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":2,"IsoCode":"QAR","Name":"Qatari Riyal","CanBuy":true,"CanSell":true,"SameCurrencySupported":false}',
              text: "Qatari Riyal",
              value: "QAR",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":2,"IsoCode":"RON","Name":"Romanian Leu","CanBuy":true,"CanSell":true,"SameCurrencySupported":false}',
              text: "Romanian Leu",
              value: "RON",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":2,"IsoCode":"RSD","Name":"Serbia Dinar","CanBuy":true,"CanSell":true,"SameCurrencySupported":false}',
              text: "Serbian Dinar",
              value: "RSD",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":0,"IsoCode":"RWF","Name":"Rwandan Franc","CanBuy":true,"CanSell":false,"SameCurrencySupported":false}',
              text: "Rwandan Franc",
              value: "RWF",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":2,"IsoCode":"SAR","Name":"Saudi Riyal","CanBuy":true,"CanSell":false,"SameCurrencySupported":false}',
              text: "Saudi Arabian Riyal",
              value: "SAR",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":2,"IsoCode":"SEK","Name":"Swedish Krona","CanBuy":true,"CanSell":true,"SameCurrencySupported":false}',
              text: "Swedish Krona",
              value: "SEK",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":2,"IsoCode":"SGD","Name":"Singapore Dollar","CanBuy":true,"CanSell":true,"SameCurrencySupported":false}',
              text: "Singapore Dollar",
              value: "SGD",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":2,"IsoCode":"THB","Name":"Thai Baht","CanBuy":true,"CanSell":true,"SameCurrencySupported":false}',
              text: "Thai Baht",
              value: "THB",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":3,"IsoCode":"TND","Name":"Tunisian Dinar","CanBuy":true,"CanSell":true,"SameCurrencySupported":false}',
              text: "Tunisian Dinar",
              value: "TND",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":2,"IsoCode":"TRY","Name":"New Turkish Lira","CanBuy":true,"CanSell":true,"SameCurrencySupported":false}',
              text: "Turkish Lira",
              value: "TRY",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":2,"IsoCode":"TTD","Name":"Trinidad and Tobago Dollar","CanBuy":true,"CanSell":false,"SameCurrencySupported":false}',
              text: "Trinidadian Dollar",
              value: "TTD",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":2,"IsoCode":"TZS","Name":"Tanzanian Shilling","CanBuy":true,"CanSell":false,"SameCurrencySupported":false}',
              text: "Tanzanian Shilling",
              value: "TZS",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":0,"IsoCode":"UGX","Name":"Uganda Shilling","CanBuy":true,"CanSell":false,"SameCurrencySupported":false}',
              text: "Ugandan Shilling",
              value: "UGX",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":2,"IsoCode":"USD","Name":"US Dollar","CanBuy":true,"CanSell":true,"SameCurrencySupported":false}',
              text: "US Dollar",
              value: "USD",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":0,"IsoCode":"VND","Name":"Vietnamese Dong","CanBuy":true,"CanSell":false,"SameCurrencySupported":false}',
              text: "Vietnamese Dong",
              value: "VND",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":0,"IsoCode":"XAF","Name":"Central African CFA Franc","CanBuy":true,"CanSell":false,"SameCurrencySupported":false}',
              text: "Central African CFA Franc BEAC",
              value: "XAF",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":2,"IsoCode":"XCD","Name":"East Caribbean Dollar","CanBuy":true,"CanSell":false,"SameCurrencySupported":false}',
              text: "East Caribbean Dollar",
              value: "XCD",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":0,"IsoCode":"XOF","Name":"West African CFA Franc","CanBuy":true,"CanSell":false,"SameCurrencySupported":false}',
              text: "CFA Franc",
              value: "XOF",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":2,"IsoCode":"ZAR","Name":"South African Rand","CanBuy":true,"CanSell":false,"SameCurrencySupported":false}',
              text: "South African Rand",
              value: "ZAR",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":2,"IsoCode":"ZMW","Name":"Zambian Kwacha","CanBuy":true,"CanSell":false,"SameCurrencySupported":false}',
              text: "Zambian Kwacha",
              value: "ZMW",
            },
          ],
          validators: [],
        },
        {
          disabled: false,
          id: "topCountries",
          options: [
            {
              allowFreeText: false,
              text: "United States",
              value: "US",
            },
            {
              allowFreeText: false,
              text: "United Kingdom",
              value: "GB",
            },
            {
              allowFreeText: false,
              text: "Canada",
              value: "CA",
            },
            {
              allowFreeText: false,
              text: "Australia",
              value: "AU",
            },
            {
              allowFreeText: false,
              text: "New Zealand",
              value: "NZ",
            },
            {
              allowFreeText: false,
              text: "Germany",
              value: "DE",
            },
            {
              allowFreeText: false,
              text: "France",
              value: "FR",
            },
          ],
          validators: [],
        },
        {
          disabled: false,
          fallBack: false,
          id: "topCurrencies",
          options: [
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":2,"IsoCode":"USD","Name":"US Dollar","CanBuy":true,"CanSell":true,"SameCurrencySupported":false}',
              text: "US Dollar",
              value: "USD",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":2,"IsoCode":"CAD","Name":"Canadian Dollar","CanBuy":true,"CanSell":true,"SameCurrencySupported":false}',
              text: "Canadian Dollar",
              value: "CAD",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":2,"IsoCode":"EUR","Name":"Euro","CanBuy":true,"CanSell":true,"SameCurrencySupported":false}',
              text: "Euro",
              value: "EUR",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":2,"IsoCode":"GBP","Name":"Great British Pound","CanBuy":true,"CanSell":true,"SameCurrencySupported":false}',
              text: "British Pound",
              value: "GBP",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":2,"IsoCode":"NZD","Name":"New Zealand Dollar","CanBuy":true,"CanSell":true,"SameCurrencySupported":false}',
              text: "New Zealand Dollar",
              value: "NZD",
            },
            {
              allowFreeText: false,
              jsonContent:
                '{"AmountPrecision":2,"IsoCode":"AUD","Name":"Australian Dollar","CanBuy":true,"CanSell":true,"SameCurrencySupported":false}',
              text: "Australian Dollar",
              value: "AUD",
            },
          ],
          validators: [],
        },
        {
          disabled: false,
          id: "State",
          options: [],
          validators: [],
        },
      ],
      subtitles: [],
    },
    purposeOfPaymentForm: {
      formFields: [
        {
          disabled: false,
          id: "purposeOfPayment-Private-Default",
          options: [
            {
              allowFreeText: false,
              text: "Bill Payment",
              value: "PRIV_BILL_PAYMENT",
            },
            {
              allowFreeText: false,
              text: "Business Payment",
              value: "PRIV_BUSINESS_PAYMENT",
            },
            {
              allowFreeText: false,
              text: "Charity Donation",
              value: "PRIV_CHARITY",
            },
            {
              allowFreeText: false,
              text: "Family Support",
              value: "PRIV_FAMILY_SUPPORT",
            },
            {
              allowFreeText: false,
              text: "Gift",
              value: "PRIV_GIFT",
            },
            {
              allowFreeText: false,
              text: "Goods/Services",
              value: "PRIV_GOODS_SERVICES",
            },
            {
              allowFreeText: false,
              text: "Holidays/Vacation",
              value: "PRIV_HOLIDAY",
            },
            {
              allowFreeText: false,
              text: "Inheritance",
              value: "PRIV_INHERITANCE",
            },
            {
              allowFreeText: false,
              text: "Investment",
              value: "PRIV_INVESTMENT",
            },
            {
              allowFreeText: false,
              text: "Living Expenses",
              value: "PRIV_LIVING",
            },
            {
              allowFreeText: false,
              text: "Loan Repayment",
              value: "PRIV_LOAN_REPAYMENT",
            },
            {
              allowFreeText: false,
              text: "Medical Expenses",
              value: "PRIV_MEDICAL",
            },
            {
              allowFreeText: false,
              text: "Mortgage/Rental",
              value: "PRIV_MORTGAGE",
            },
            {
              allowFreeText: true,
              text: "Other",
              value: "PRIV_OTHER",
            },
            {
              allowFreeText: false,
              text: "Pension",
              value: "PRIV_PENSION",
            },
            {
              allowFreeText: false,
              text: "Property Purchase/Sale",
              value: "PRIV_PROPERTY_BUY_SELL",
            },
            {
              allowFreeText: false,
              text: "Overseas Relocation",
              value: "PRIV_RELOCATION",
            },
            {
              allowFreeText: false,
              text: "Salary",
              value: "PRIV_SALARY",
            },
            {
              allowFreeText: false,
              text: "Tax Payments",
              value: "PRIV_TAX",
            },
            {
              allowFreeText: false,
              text: "Test Transfer",
              value: "PRIV_TEST_TRANSFER",
            },
            {
              allowFreeText: false,
              text: "Travel Expenses",
              value: "PRIV_TRAVEL_EXPENSES",
            },
            {
              allowFreeText: false,
              text: "Tuition",
              value: "PRIV_TUITION",
            },
            {
              allowFreeText: false,
              text: "Wedding",
              value: "PRIV_WEDDING",
            },
          ],
          validators: [],
        },
        {
          disabled: false,
          id: "purposeOfPayment-Private-Inr",
          options: [
            {
              allowFreeText: false,
              text: "Investment",
              value: "PRIV_INR_BANKERS",
            },
            {
              allowFreeText: false,
              text: "Housing Society/Real Estate Developer Payment",
              value: "PRIV_INR_COOP",
            },
            {
              allowFreeText: false,
              text: "Credit to NRE in INR",
              value: "PRIV_INR_CREDIT",
            },
            {
              allowFreeText: false,
              text: "Tuition",
              value: "PRIV_INR_EDUCATIONAL",
            },
            {
              allowFreeText: false,
              text: "EMI payments",
              value: "PRIV_INR_EMI",
            },
            {
              allowFreeText: false,
              text: "Family of NRI Payment",
              value: "PRIV_INR_FAMILIES",
            },
            {
              allowFreeText: false,
              text: "Hotel Payment",
              value: "PRIV_INR_HOTELS",
            },
            {
              allowFreeText: false,
              text: "Medical Expenses",
              value: "PRIV_INR_MEDICAL",
            },
            {
              allowFreeText: false,
              text: "LIC, UTI & Post Master Payment",
              value: "PRIV_INR_POSTMASTER",
            },
            {
              allowFreeText: false,
              text: "Tax Payments",
              value: "PRIV_INR_TAX",
            },
            {
              allowFreeText: false,
              text: "Trade transactions",
              value: "PRIV_INR_TRADE",
            },
            {
              allowFreeText: false,
              text: "Travel Agent Payment",
              value: "PRIV_INR_TRAVEL",
            },
            {
              allowFreeText: false,
              text: "Payments to utility service providers",
              value: "PRIV_INR_UTILTY",
            },
          ],
          validators: [],
        },
        {
          disabled: false,
          id: "purposeOfPayment-Corporate-Default",
          options: [
            {
              allowFreeText: false,
              text: "Bonus (Salary)",
              value: "CORP_BONUS",
            },
            {
              allowFreeText: false,
              text: "Charity Funding",
              value: "CORP_CHARITY",
            },
            {
              allowFreeText: false,
              text: "Payment from Customer",
              value: "CORP_CUSTOMER_PAYMENT",
            },
            {
              allowFreeText: false,
              text: "Dividend",
              value: "CORP_DIVIDEND",
            },
            {
              allowFreeText: false,
              text: "Tuition",
              value: "CORP_EDUCATIONAL",
            },
            {
              allowFreeText: false,
              text: "Employee Expenses",
              value: "CORP_EMPLOYEE_EXPENSES",
            },
            {
              allowFreeText: false,
              text: "Freight Cost/Services",
              value: "CORP_FREIGHT",
            },
            {
              allowFreeText: false,
              text: "Import/Export of Goods/Services",
              value: "CORP_IMPORT_EXPORT",
            },
            {
              allowFreeText: false,
              text: "Insurance Claim",
              value: "CORP_INSURANCE",
            },
            {
              allowFreeText: false,
              text: "Investment",
              value: "CORP_INVESTMENT",
            },
            {
              allowFreeText: false,
              text: "Invoice",
              value: "CORP_INVOICE",
            },
            {
              allowFreeText: false,
              text: "Medical Expenses",
              value: "CORP_MEDICAL",
            },
            {
              allowFreeText: false,
              text: "Operating Cost",
              value: "CORP_OPERATING_COST",
            },
            {
              allowFreeText: true,
              text: "Other",
              value: "CORP_OTHER",
            },
            {
              allowFreeText: false,
              text: "Outsourcing/Consultancy",
              value: "CORP_OUTSOURCING",
            },
            {
              allowFreeText: false,
              text: "Pension",
              value: "CORP_PENSION",
            },
            {
              allowFreeText: false,
              text: "Property Purchase/Sale",
              value: "CORP_PROPERTY_BUY_SELL",
            },
            {
              allowFreeText: false,
              text: "Property Management",
              value: "CORP_PROPERTY_MANAGEMENT",
            },
            {
              allowFreeText: false,
              text: "Repatriation of Funds",
              value: "CORP_REPATRIATION",
            },
            {
              allowFreeText: false,
              text: "Salary",
              value: "CORP_SALARY",
            },
            {
              allowFreeText: false,
              text: "Supplier Payment",
              value: "CORP_SUPPLIER_PAYMENT",
            },
            {
              allowFreeText: false,
              text: "Tax",
              value: "CORP_TAX",
            },
            {
              allowFreeText: false,
              text: "Travel Services",
              value: "CORP_TRAVEL_SERVICES",
            },
          ],
          validators: [],
        },
        {
          disabled: false,
          id: "purposeOfPayment-Corporate-Inr",
          options: [
            {
              allowFreeText: false,
              text: "Investment",
              value: "CORP_INR_BANKERS",
            },
            {
              allowFreeText: false,
              text: "Housing Society/Real Estate Developer Payment",
              value: "CORP_INR_COOP",
            },
            {
              allowFreeText: false,
              text: "Credit to NRE in INR",
              value: "CORP_INR_CREDIT",
            },
            {
              allowFreeText: false,
              text: "Tuition",
              value: "CORP_INR_EDUCATIONAL",
            },
            {
              allowFreeText: false,
              text: "EMI payments",
              value: "CORP_INR_EMI",
            },
            {
              allowFreeText: false,
              text: "Family of NRI Payment",
              value: "CORP_INR_FAMILIES",
            },
            {
              allowFreeText: false,
              text: "Hotel Payment",
              value: "CORP_INR_HOTELS",
            },
            {
              allowFreeText: false,
              text: "Medical Expenses",
              value: "CORP_INR_MEDICAL",
            },
            {
              allowFreeText: false,
              text: "LIC, UTI & Post Master Payment",
              value: "CORP_INR_POSTMASTER",
            },
            {
              allowFreeText: false,
              text: "Tax payments",
              value: "CORP_INR_TAX",
            },
            {
              allowFreeText: false,
              text: "Trade transactions",
              value: "CORP_INR_TRADE",
            },
            {
              allowFreeText: false,
              text: "Travel Agent Payment",
              value: "CORP_INR_TRAVEL",
            },
            {
              allowFreeText: false,
              text: "Payments to utility service providers",
              value: "CORP_INR_UTILTY",
            },
          ],
          validators: [],
        },
      ],
      subtitles: [],
    },
    sourceOfFundsForm: {
      formFields: [
        {
          disabled: false,
          id: "sourceoffunds",
          options: [
            {
              allowFreeText: false,
              text: "Bank Loan",
              value: "BANK_L",
            },
            {
              allowFreeText: false,
              text: "Benefits",
              value: "P_BENE",
            },
            {
              allowFreeText: false,
              text: "Charity Donation",
              value: "CHAR_DON",
            },
            {
              allowFreeText: false,
              text: "Company Profits/Dividends",
              value: "COMP_PROF",
            },
            {
              allowFreeText: false,
              text: "Inheritance",
              value: "INHERI_EST",
            },
            {
              allowFreeText: false,
              text: "Insurance Claim",
              value: "INSUR_CL",
            },
            {
              allowFreeText: false,
              text: "Line of Credit",
              value: "LIN_O_CRED",
            },
            {
              allowFreeText: false,
              text: "Loan",
              value: "LOAN",
            },
            {
              allowFreeText: false,
              text: "Lottery/Gambling Winnings",
              value: "LOTTO_GAM",
            },
            {
              allowFreeText: false,
              text: "Maturing Investments",
              value: "M_INVEST",
            },
            {
              allowFreeText: false,
              text: "Pension",
              value: "PENSION",
            },
            {
              allowFreeText: false,
              text: "Post Marital Maintenance",
              value: "PMAR_MAIN",
            },
            {
              allowFreeText: false,
              text: "Property/Real Estate Sale",
              value: "PROP_SALE",
            },
            {
              allowFreeText: false,
              text: "Rental Income",
              value: "RENT_INCOM",
            },
            {
              allowFreeText: false,
              text: "Salary",
              value: "SALARY",
            },
            {
              allowFreeText: false,
              text: "Sale of Car",
              value: "SALE_VEHIC",
            },
            {
              allowFreeText: false,
              text: "Sale of Shares",
              value: "SHARE_SALES",
            },
            {
              allowFreeText: false,
              text: "Savings",
              value: "SAVINGS",
            },
            {
              allowFreeText: false,
              text: "Social Security Insurance",
              value: "SOC_SEC_INS",
            },
            {
              allowFreeText: false,
              text: "Tax Rebate",
              value: "TAX_REB",
            },
            {
              allowFreeText: false,
              text: "Unemployment Insurance",
              value: "UNEMPLOY_IN",
            },
            {
              allowFreeText: false,
              text: "Workers Compensation",
              value: "WORK_COMPO",
            },
            {
              allowFreeText: false,
              text: "Other",
              value: "OTH",
            },
          ],
          validators: [],
        },
      ],
      subtitles: [],
    },
  },
  geoLocation: {
    countryCode: "US",
  },
};
