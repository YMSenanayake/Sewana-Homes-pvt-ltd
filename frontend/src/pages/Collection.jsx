import React, { useEffect, useState } from 'react'
import Item from '../components/Item'
import { useAppContext } from '../context/AppContext'
import SearchInput from '../components/SearchInput'


const Collection = () => {

  const { products, searchQuery } = useAppContext()
  const [filteredProducts, setFilteredProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  // apply filter line search, category and instock
  const applyFilters = () => {
    let filtered = [...products]
    //products that are insock
    filtered = filtered.filter(p => p.inStock)

    if (searchQuery) {
      filtered = filtered.filter(product => product.title.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    return filtered
  }

  // sorting logic based on price or relevent
  const applySorting = (productsList) => {
    return productsList
  }

  //update filtered and sorted products whenever dependencies change
  useEffect(() => {
    let filtered = applyFilters()
    let sorted = applySorting(filtered)
    setFilteredProducts(sorted)
    setCurrentPage(1) // Reset to first page when filters change
  }, [products, searchQuery])

  // handel pagination logic
  const getPaginatedProducts = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredProducts.slice(startIndex, endIndex)
  }

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)

  return (
    <div className='max-padd-container !px-0 mt-33'>
      <div className='flex flex-col  gap-8 mb-16'>
        {/* filter Option  */}
        <div className='min-w-72 p-4 pl-6 lg:pl-6 rounded-r-xl'>
          <SearchInput />
        </div>
        {/* right side - filterd products  */}
        <div className='max-sm:px-10 sm:pr-10'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {getPaginatedProducts().length > 0 ? (
              getPaginatedProducts().map((product) => (
                <Item product={product} key={product._id} />
              ))
            ) : (
              <p className="capitalize">No products found for selected filters.</p>
            )}
          </div>
          {/* pagination */}
          <div className='flexCenter flex flex-wrap mt-14 mb-10 gap-4'>
            <button disabled={currentPage === 1} onClick={()=> setCurrentPage((prev)=> prev - 1)} 
            className={`btn-secondary !py-1 !px-3 ${currentPage === 1 && "opacity-50 cursor-not-allowed"}`}>
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button key={index + 1}  onClick={()=> setCurrentPage(index + 1)} 
            className={`btn-light !py-1 !px-3 ${currentPage === index + 1 && "bg-tertiary text-white"}`}>{index + 1}</button>
            ))}
            <button disabled={currentPage === totalPages} onClick={()=> setCurrentPage((prev)=> prev + 1)} 
            className={`btn-secondary !py-1 !px-3 ${currentPage === totalPages && "opacity-50 cursor-not-allowed"}`}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Collection
