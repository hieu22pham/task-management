module.exports = (objectPagination, query, countRecords) => {
  if (query.page) {
    objectPagination.currentPage = parseInt(query.page)
  }

  objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItem

  objectPagination.totalPage = Math.ceil(countRecords / objectPagination.limitItem)

  return objectPagination;
}