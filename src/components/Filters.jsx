import { useId } from 'react'
import './Filters.css'
import { useFilters } from '../hooks/useFilters'

export function Filters () {
  const { filters, setFilters } = useFilters()
  const minPriceFilterId = useId()
  const categoryFilterId = useId()

  function handleChangeMinPrice (event) {
    setFilters(prevState => ({
      ...prevState,
      minPrice: event.target.value
    }))
  }

  function handleChangeCategory (event) {
    setFilters(prevState => ({
      ...prevState,
      category: event.target.value
    }))
  }

  return (
        <section className='filters'>
            <div>
                <label htmlFor='price'>Price</label>
                <input
                    type='range'
                    id={minPriceFilterId}
                    min={0}
                    max={1000}
                    value={filters.minPrice}
                    onChange={handleChangeMinPrice}
                />
                <span> $ {filters.minPrice} </span>
            </div>

            <div>
                <label htmlFor='category'>Category</label>
                <select id={categoryFilterId} onChange={handleChangeCategory}>
                    <option value='all'>All</option>
                    <option value='laptops'>Laptops</option>
                    <option value='smartphones'>smartphones</option>
                    <option value='fragrances'>fragrances</option>
                </select>
            </div>
        </section>
  )
}
