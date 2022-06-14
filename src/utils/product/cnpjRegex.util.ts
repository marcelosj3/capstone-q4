export const cnpjRegex: RegExp = /^\d{2}\.\d{3}\.\d{3}\/0{3}(1|2)\-\d{2}$/gm;

export const cnpjMessage: string =
  'Formatos válidos: XX.XXX.XXX/0001-XX (matriz) ou XX.XXX.XXX/0002-XX (filial)';

// CNPJ pattern
// XX.XXX.XXX/0001-XX 0001 - matriz
// XX.XXX.XXX/0002-XX 0002 - filial
