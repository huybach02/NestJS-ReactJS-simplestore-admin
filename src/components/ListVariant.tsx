import {Button, Card, Flex, Image, List, Tag} from "antd";
import {ProductVariantType} from "../types/productVariantType";
import {formatMoney} from "../utils/formatMoney";
import moment from "moment";

const ListVariant = ({
  variants,
  setVariantSelected,
  setIsModalOpen,
  handleDeleteVariant,
}: {
  variants: ProductVariantType[];
  setVariantSelected: (variant: ProductVariantType) => void;
  setIsModalOpen: (open: boolean) => void;
  handleDeleteVariant: (variantId: string) => void;
}) => {
  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 4,
        xxl: 3,
      }}
      dataSource={variants}
      renderItem={(item) => (
        <List.Item>
          <Card
            title={item.name}
            style={{boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)"}}
          >
            <p>
              <b>Thumbnail:</b>{" "}
              <Image
                src={
                  item.thumbnail ||
                  "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
                }
                alt="thumbnail"
                width={70}
                style={{borderRadius: "5px"}}
              />
            </p>
            <p>
              <b>Sizes:</b>{" "}
              {item.sizes.map((size) => (
                <Tag key={size}>{size}</Tag>
              ))}
            </p>
            <p>
              <b>Original Price:</b>{" "}
              <Tag color="green">{formatMoney(item.originalPrice)}</Tag>
            </p>
            <p>
              <b>Has Sale:</b> {item.hasSale ? "Yes" : "No"}
            </p>
            {item.hasSale && (
              <>
                <p>
                  <b>Type Sale:</b> {item.typeSale?.toUpperCase()}
                </p>
                <p>
                  <b>Sale Value:</b>{" "}
                  {item.saleValue && item.typeSale === "percentage"
                    ? `${item.saleValue}%`
                    : formatMoney(+item.saleValue!)}
                </p>
                <p>
                  <b>Sale Price:</b>{" "}
                  <Tag color="red">{formatMoney(item.salePrice!)}</Tag>
                </p>
                <p>
                  <b>Sale Start Date:</b>{" "}
                  {moment(item.saleStartDate).format("DD/MM/YYYY HH:mm:ss")}
                </p>
                <p>
                  <b>Sale End Date:</b>{" "}
                  {moment(item.saleEndDate).format("DD/MM/YYYY HH:mm:ss")}
                </p>
                <p>
                  <b>Sale Price:</b> {formatMoney(item.salePrice!)}
                </p>
              </>
            )}
            <p>
              <b>Quantity:</b> {item.quantity}
            </p>
            <p>
              <b>Status:</b>{" "}
              <Tag color={item.active ? "green" : "red"}>
                {item.active ? "Active" : "Inactive"}
              </Tag>
            </p>
            <Flex justify="space-between" align="center">
              <Button
                type="default"
                onClick={() => {
                  setVariantSelected(item);
                  setIsModalOpen(true);
                }}
              >
                Edit
              </Button>
              <Button
                type="primary"
                danger
                onClick={() => handleDeleteVariant(item._id)}
              >
                Delete
              </Button>
            </Flex>
          </Card>
        </List.Item>
      )}
    />
  );
};

export default ListVariant;
