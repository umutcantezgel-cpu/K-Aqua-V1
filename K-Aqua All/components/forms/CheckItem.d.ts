/** Checkbox-Karte mit Titel + Beschreibung — für Paket-Builder und Rechner. */
export interface CheckItemProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  /** fette Hauptzeile (Outfit), darf Wert enthalten: "Essenszuschuss +108 €" */
  title: React.ReactNode;
  /** optionale Erklärzeile */
  description?: string;
}
