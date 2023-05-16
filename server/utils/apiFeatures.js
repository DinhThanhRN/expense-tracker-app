class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filter() {
    const queryObj = {...this.queryString};
    if (queryObj.price) queryObj.price = queryObj.price * 1;
    const excludedFields = ['sort', 'limit', 'page', 'fields'];
    excludedFields.forEach(element => delete queryObj[element]);

    let queryString = JSON.stringify(queryObj);
    queryString.replace((/\b(gte|gt|lte|lt)\b/g, match => `$${match}`));

    this.query = this.query.find(JSON.parse(queryString));
    return this;
  }
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.split(',').join(' ');
      console.log(sortBy);
      this.query = this.query.sort(sortBy);
    } else this.query = this.query.sort('-paidAt');
    return this;
  }
  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else this.query = this.query.select('-__v');
    return this;
  }
}

module.exports = APIFeatures;
