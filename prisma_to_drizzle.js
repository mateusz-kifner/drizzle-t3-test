const prismaSchema = `model Order {
    id               Int            @id @default(autoincrement())
    name             String?        @db.VarChar(255)
    status           String?        @default("planned") @db.VarChar(255)
    notes            String?
    price            String?        @db.VarChar(255)
    isPricePaid      Boolean?
    dateOfCompletion DateTime?      @db.Date
    spreadsheets     Spreadsheet[]
    designs          Design[]
    emails           EmailMessage[]
    products         Product[]
    employees        User[]
    files            File[]
    workTime         Float?
    client           Client?        @relation(fields: [clientId], references: [id])
    address          TypeAddress?   @relation(fields: [addressId], references: [id])
    clientId         Int?
    addressId        Int?
    createdAt        DateTime       @default(now())
    updatedAt        DateTime       @updatedAt
    createdById      Int?
    updatedById      Int?
  }`
const convertPrismaToDrizzle = () => {
  const schemaFields = prismaSchema.split(/\r?\n/);
  schemaFields.pop();
  const interestedParts = schemaFields;
  const modelName = interestedParts?.[0]?.match(/(?<=(model)+)(.*?)(?=\{)/)?.[0]?.trim()?.toLowerCase();
  //console.log("modelName", modelName);

  let drizzleFields = [];
  drizzleFields.push(`export const ${modelName} = pgTable("${modelName}", {`)
  for(let i=1; i< interestedParts?.length; i++){
      let field;
      
      if(interestedParts[i]?.indexOf("@relation")>=0){
          field = extractRelation(interestedParts[i]);
      }else{
          field = interestedParts[i].trim().replace(/[ ,]+/g, ",");
      }

      //console.log("field", field);
      

      const parts = field ? field.split(","): null;
      const snakeCase = parts?.[0] ? parts[0].replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`): parts?.[0];
      const relation = parts?.[3] && parts?.[3]!=null &&  parts?.[3]!=undefined ? parts?.[3] : parts?.[2];
      const type = parts?.[1] ? convertType(parts[1], snakeCase, relation): parts?.[1];
      const decorator = convertRelation(relation, parts?.[1], snakeCase);
      const final = parts?.[0] + ": " +  type + decorator;
      drizzleFields.push(final);
  }
  drizzleFields.push("}");
  console.log(drizzleFields.join("\n\t"));
  
}

const extractRelation = (part) => {
  let matches = part.match("@relation");
  if(matches && matches.length>0 && matches?.index){
      let relationPart = part.substr(matches.index, part.length)
      let fieldPart = part.replace(relationPart,"").trim().replace(/[ ,]+/g, ",");
     // console.log(fieldPart + "," +relationPart);
      return fieldPart + "," +relationPart;
  }else{
      return part;
  }
}

const convertType = (type, snakecase, relation)=>{
  if(type){
      if(type.indexOf("Int?")>=0 && type.indexOf("Int?")>=0){
          return "integer(\""+snakecase+"\")";
      }else if(type.indexOf("Int")>=0 && type.indexOf("Int?")<0){
          return "integer(\""+snakecase+"\").notNull()";
      }else if(type.indexOf("String")>=0){
          return "varchar(\""+snakecase+"\", { length: 255 })";
      }else if(type.indexOf("Boolean")>=0){
          return "integer(\""+snakecase+"\")";
      }else if(type.indexOf("DateTime")>=0) {
          return "timestamp(\""+snakecase+"\")";
      }else{
          const value = relation?.split("references: [")?.[1]?.replace("]","");
          return "text('" + type?.toLowerCase()?.replace("?","") + "_" + value + "')"
      }
  }else{
      return type;
  }
}

const convertRelation = (relation, type, snakeCase) => {
  if(!relation){
      return ",";
  }

  if(relation.indexOf("@default") >=0 && relation.indexOf("autoincrement()")<0 && relation.indexOf("@default(now())")<0){
      let value;

      if(type && type?.indexOf("Boolean")>=0){
          value = relation?.replace("@default(","").replace(")","");
          value = value == "true" ? "1" : "0";
      }else{
          value = relation.indexOf("@default('")>=0 ? relation?.replace("@default('","").replace("')",""): relation?.replace("@default(","").replace(")","");
      }

      return relation.indexOf("@default('")>=0 ? ".default(\"" + value + "\"),": ".default(" + value + "),";
  }else if(relation.indexOf("@default(now())") >= 0){
      return ".default(sql`(strftime('%s', 'now'))`),";
  }else if(relation.indexOf("@default") >=0 && relation.indexOf("autoincrement()")>=0){
      return ".primaryKey(),";
  }else if(relation.indexOf("references") >=0 && type){
      const value = relation?.split("references: [")?.[1]?.replace("]","");
      return ".references(()=> " + snakeCase + "." + value + ","
  }else{
      return "";
  }
}

convertPrismaToDrizzle();