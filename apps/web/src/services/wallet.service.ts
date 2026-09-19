import api from "@/lib/api";

class WalletService {

  async getWallet() {

    const response = await api.get("/wallet");

    return response.data.data;

  }

}

export default new WalletService();