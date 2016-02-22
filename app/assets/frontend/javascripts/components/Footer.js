import React from 'react'
import FilterLink from '../containers/FilterLink_Ctnr'


const Footer = () => (
  <p>Component footer <br />
    Show:
    {" "}
    <FilterLink filter="SHOW_ALL">
      Sämtlich
    </FilterLink>
    {", "}
    <FilterLink filter="SHOW_ACTIVE">
      Active
    </FilterLink>
    {", "}
    <FilterLink filter="SHOW_COMPLETED">
      Vollendet
    </FilterLink>
  </p>
)

export default Footer