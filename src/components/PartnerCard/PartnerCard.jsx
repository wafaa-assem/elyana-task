const PartnerCard = ({ id, img, name }) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="py-[23.69px] px-[25.45px]">
          <img src={img} alt="" />
        </div>
        <h3 className="text-center">{name}</h3>
      </div>
    </>
  );
};

export default PartnerCard;
