export const profileMutation = `
  mutation UpdateUser($first_name: String, $last_name: String, $email: String, $phone_number: String) {
    updateUser(first_name: $first_name, last_name: $last_name, email: $email phone_number: $phone_number) {
      first_name
      email
    }
  }
`;

export const createDepot = `
  mutation CreateDepot($address1: String, $address2: String, $city: String, $region: String, $zipcode: Int, $ownerId: ID) {
    addDepot(address_1: $address1, address_2: $address2, city: $city, region: $region, zipcode: $zipcode, owner_id: $ownerId) {
      id
      address_1
    }
  }
`;

export const createTool = `
  mutation AddTool($title: String, $category: String, $description: String, $price: Float, $depot_id: ID) {
    addTool(title: $title, category: $category, description: $description, price: $price, depot_id: $depot_id) {
      title
      category
    }
  }
`;
