import Array "mo:core/Array";
import Time "mo:core/Time";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";

import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";


actor {
  // Initialize the access control system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Management
  public type UserProfile = {
    name : Text;
    email : Text;
    phoneNumber : Text;
    investorType : ?Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Property Management
  type Property = {
    id : Nat;
    title : Text;
    assetType : Text;
    leaseStatus : Text;
    targetYield : Float;
    minimumInvestment : Nat;
  };

  type WaitlistEntry = {
    name : Text;
    email : Text;
    phoneNumber : Text;
    investorType : ?Text;
    timestamp : Time.Time;
  };

  let featuredProperties : [Property] = [
    {
      id = 1;
      title = "Commercial Pre-Leased Office – Bengaluru";
      assetType = "Commercial";
      leaseStatus = "Pre-Leased";
      targetYield = 8.5;
      minimumInvestment = 500_000;
    },
    {
      id = 2;
      title = "Residential Luxury Apartment – Mumbai";
      assetType = "Residential";
      leaseStatus = "Available";
      targetYield = 7.2;
      minimumInvestment = 300_000;
    },
    {
      id = 3;
      title = "Retail Space – Delhi";
      assetType = "Retail";
      leaseStatus = "Leased";
      targetYield = 9.0;
      minimumInvestment = 750_000;
    },
  ];

  var waitlistEntries : [WaitlistEntry] = [];

  // Public query - no authentication required (marketing content)
  public query func getFeaturedProperties() : async [Property] {
    featuredProperties;
  };

  // Public query - no authentication required (marketing content)
  public query func getPropertyById(id : Nat) : async ?Property {
    featuredProperties.find<Property>(func(p : Property) : Bool { p.id == id });
  };

  // Public function - no authentication required (lead generation)
  public shared ({ caller }) func joinWaitlist(name : Text, email : Text, phoneNumber : Text, investorType : ?Text) : async Bool {
    let entry : WaitlistEntry = {
      name;
      email;
      phoneNumber;
      investorType;
      timestamp = Time.now();
    };

    waitlistEntries := waitlistEntries.concat([entry]);
    true;
  };

  // Admin-only function to view waitlist entries
  public query ({ caller }) func getWaitlistEntries() : async [WaitlistEntry] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view waitlist entries");
    };
    waitlistEntries;
  };

  // Listings Management
  public type Listing = {
    id : Nat;
    title : Text;
    description : Text;
    price : Nat;
    seller : Principal;
    images : [[Nat8]];
    createdAt : Time.Time;
  };

  var listings : [Listing] = [];
  var nextListingId = 1;

  // Create new listing - requires authenticated user
  public shared ({ caller }) func createListing(title : Text, description : Text, price : Nat, images : [[Nat8]]) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can create listings");
    };

    let listing : Listing = {
      id = nextListingId;
      title;
      description;
      price;
      seller = caller;
      images;
      createdAt = Time.now();
    };

    listings := listings.concat([listing]);
    nextListingId += 1;
    listing.id;
  };

  // Get all listings - public access (marketplace browsing)
  public query func getAllListings() : async [Listing] {
    listings;
  };

  // Get listing by ID - public access (viewing individual listings)
  public query func getListingById(id : Nat) : async ?Listing {
    listings.find(func(l) { l.id == id });
  };

  // Get listings by seller - requires caller to be the seller or admin
  public query ({ caller }) func getListingsBySeller(seller : Principal) : async [Listing] {
    if (caller != seller and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own listings");
    };
    listings.filter(func(l) { l.seller == seller });
  };
};
