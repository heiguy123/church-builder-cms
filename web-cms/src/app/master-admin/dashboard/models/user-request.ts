export interface UserRequest {
    // id: number;
    // title: string;
    // last_bid?: number;
    // price: number;
    // creator?: string;
    // avatar?: string;
    // instant_price?: number;
    // ending_in?: string;
    // image: string;

    request_id: string;
    creation_date: string;
    organization_name: string;
    applicant_email: string;
    document_link: string;
    activated: boolean;
    applicant_first_name?: string;
    applicant_last_name?: string;
    organization_address?: string;
    organization_city?: string;
    organization_state?: string;
    organization_zip?: string;
    organizatiton_demonination?: string;
    organization_member_size?: string;
    role?: string;
  }