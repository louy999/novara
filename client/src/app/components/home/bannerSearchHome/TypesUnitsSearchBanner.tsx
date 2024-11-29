import React from "react";
interface TypesSearchBannerProps {
  changeSet: (value: string) => void;
  valueSet: string;
}
const TypesUnitsSearchBanner: React.FC<TypesSearchBannerProps> = ({
  changeSet,
  valueSet,
}) => {
  return (
    <select
      className="select select-info w-full lg:w-fit"
      onChange={(e) => changeSet(e.target.value)}
      value={valueSet}
    >
      <option disabled selected value="">
        Type Unit
      </option>
      <option value="apartment">Apartment</option>
      <option value="villa">Villa</option>
      <option value="commercial">Commercial</option>
      <option value="admin">Admin</option>
      <option value="clinics">Clinics</option>
    </select>
  );
};

export default TypesUnitsSearchBanner;
