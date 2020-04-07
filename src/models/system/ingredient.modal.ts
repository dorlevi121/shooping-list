export type Ingredient = {
    titleHeb: string,
    titleEng?: string,
    type: IngredientType,
    unit?: IngredientUnit,
    brands?: string[]
    icon?: string
}

export enum IngredientType {
    DAIRY = "מוצרי חלב",
    FRUITS = "פירות",
    VEGETABLES = "ירקות",
    CANDIES = "ממתקים",
    CEREALS = "דגנים",
    MEET = "בשר",
    FISH = "דגים",
    SPICES = "תבלינים",
    DRINKS = "משקאות",
    CLEANERS = "חומרי ניקוי",
    COSMETICS = "קוסמטיקה",
    CANNING = "שימורים",
    FROZEN = "קפואים",
    OTHER = "אחר",
    HEALTH = "טבע ובריאות"

} 

export enum IngredientUnit {
    GRAM = "גרם",
    KG = "קילו",
    AMOUNT = "כמות"
}