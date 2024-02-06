export default {
  methods: {
    formatDate(date) {
      const updatedDate = new Date(date);
      const year = updatedDate.getFullYear();
      const month = (updatedDate.getMonth() + 1).toString().padStart(2, "0");
      const day = updatedDate.getDate().toString().padStart(2, "0");

      return `${year}-${month}-${day}`;
    }
  }
}
