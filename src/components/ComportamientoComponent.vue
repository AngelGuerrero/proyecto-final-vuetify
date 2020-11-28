<template>
  <div>
    <v-card-title class="justify-center">
      <h1 class="text-center text-h4 text-md-h4">
        Categoria Comportamiento del cliente
      </h1>
    </v-card-title>

    <v-card-text>
      <section>
        <article>
          <h3 class="text-center text-xl sm:text-2xl">
            Categoria Comportamiento del cliente
          </h3>

          <p class="text-center">
            En Comportamiento del cliente puedes filtrar las caracteristacas del
            comportamiento de compra del cliente. Ahora bien, si no lo
            requieres, pues dar clic en continuar.
          </p>

          <v-card>
            <v-card-text>
              <v-row>
                <v-col cols="12" md="4">
                  <v-card>
                    <v-card-title><h5>Puntualidad</h5></v-card-title>
                    <v-card-text>
                      <v-checkbox label="Cliente A"></v-checkbox>
                      <v-checkbox label="Cliente B"></v-checkbox>
                      <v-checkbox label="Cliente C"></v-checkbox>
                      <v-checkbox label="Cliente D"></v-checkbox>
                      <v-checkbox label="Cliente Nuevo"></v-checkbox>
                      <v-checkbox label="Cliente Moroso"></v-checkbox>
                      <v-checkbox label="Sin Dato/No incluir"></v-checkbox>
                    </v-card-text>
                  </v-card>
                </v-col>

                <v-col cols="12" md="4">
                  <v-card>
                    <v-card-title><h5>Tipo de cliente</h5></v-card-title>
                    <v-card-text>
                      <v-checkbox label="Contado"></v-checkbox>
                      <v-checkbox label="Credito Titular"></v-checkbox>
                      <v-checkbox label="Credito Adicional"></v-checkbox>
                      <v-checkbox label="Credito Especial"></v-checkbox>
                      <v-checkbox label="Empleado Titular"></v-checkbox>
                      <v-checkbox label="Cliente Moroso"></v-checkbox>
                      <v-checkbox label="Sin Dato/No incluir"></v-checkbox>
                    </v-card-text>
                  </v-card>
                </v-col>

                <v-col cols="12" md="4">
                  <v-card>
                    <v-card-title><h5>¿Es cliente?</h5></v-card-title>
                    <v-card-text>
                      <v-checkbox label="Si"></v-checkbox>
                      <v-checkbox label="No"></v-checkbox>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>

              <v-row>
                <!-- Antiguedad del cliente -->
                <v-col cols="12" md="6">
                  <v-card>
                    <v-card-title class="justify-center">
                      <h5 class="text-center">Antiguedad del cliente</h5>
                    </v-card-title>
                    <v-card-text>
                      <p class="text-center">
                        Elije los minimos y maximos de años de antiguedad del
                        cliente
                      </p>

                      <v-row>
                        <v-col cols="12">
                          <input type="text" id="rangeAntiguedadCliente" />
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-col>

                <!-- Última actividad del cliente -->
                <v-col cols="12" md="6">
                  <v-card>
                    <v-card-title class="justify-center">
                      <h5 class="text-center">Ultima actividad</h5>
                    </v-card-title>
                    <v-card-text>
                      <p class="text-center">
                        Elije los minimos y maximos en meses de la ultima
                        actividad de cliente
                      </p>

                      <v-row>
                        <v-col cols="12">
                          <input type="text" id="rangeClienteUltimaActividad" />
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" md="6" lg="4">
                  <v-card>
                    <v-card-title class="justify-center">
                      <h5>Fecha de ultima actividad e R</h5>
                    </v-card-title>
                    <v-card-text>
                      <v-row justify="center">
                        <v-date-picker
                          v-model="fechaUltimaActividadR"
                          color="purple"
                          range
                        ></v-date-picker>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-col>

                <v-col cols="12" md="6" lg="4">
                  <v-card>
                    <v-card-title class="justify-center">
                      <h5>Fecha de ultima actividad e M</h5>
                    </v-card-title>
                    <v-card-text>
                      <v-row justify="center">
                        <v-date-picker
                          v-model="fechUltimaActividadM"
                          range
                        ></v-date-picker>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-col>

                <v-col cols="12" md="12" lg="4">
                  <v-card>
                    <v-card-title class="justify-center">
                      <h5>Fecha de ultima actividad e T</h5>
                    </v-card-title>
                    <v-card-text>
                      <v-row justify="center">
                        <v-date-picker
                          color="orange"
                          v-model="fechaUltimaActividadT"
                          range
                        />
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>

              <div>
                <v-card>
                  <v-card-title class="justify-center">
                    <h4 class="text-center">C y A del cliente</h4>
                  </v-card-title>

                  <v-card-text>
                    <p class="text-center">
                      En esta sección podras seleccionar algunas de las
                      carateristicas del C y a del cliente
                    </p>

                    <v-row>
                      <v-col cols="12" md="6">
                        <v-card>
                          <v-card-title class="justify-center">
                            <h5 class="text-center">Importe Abonado</h5>
                          </v-card-title>
                          <v-card-text>
                            <p class="text-center">
                              Elije los minimos y maximos de la linea de credito
                              otorgada al cliente
                            </p>

                            <v-row>
                              <input type="text" id="rangeImporteAbonado" />
                            </v-row>
                          </v-card-text>
                        </v-card>
                      </v-col>

                      <v-col cols="12" md="6">
                        <v-card>
                          <v-card-title class="justify-center">
                            <h5 class="text-center">Canal de Abono</h5>
                          </v-card-title>
                          <v-card-text>
                            <v-checkbox label=" C "></v-checkbox>
                            <v-checkbox label="A C"></v-checkbox>
                            <v-checkbox label="W"></v-checkbox>
                            <v-checkbox label="Sin identifica"></v-checkbox>
                          </v-card-text>
                        </v-card>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="12" md="6">
                        <v-card>
                          <v-card-title class="justify-center">
                            <h5 class="text-center">Linea de C</h5>
                          </v-card-title>
                          <v-card-text>
                            <v-row class="justify-center">
                              <input type="text" id="rangeLineaDeC" />
                            </v-row>
                          </v-card-text>
                        </v-card>
                      </v-col>

                      <v-col cols="12" md="6">
                        <v-card>
                          <v-card-title class="justify-center">
                            <h5 class="mb-3 text-center">
                              Fecha del ultimo movimiento de A
                            </h5>
                          </v-card-title>
                          <v-card-text>
                            <v-row class="justify-center">
                              <v-date-picker
                                v-model="fechaUltimoMovimientoA"
                                color="indigo"
                                range
                              ></v-date-picker>
                            </v-row>
                          </v-card-text>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </div>
            </v-card-text>
          </v-card>
        </article>
      </section>
    </v-card-text>
  </div>
</template>

<script>
export default {
  name: 'ComportamientoComponent',

  data: () => ({
    fechaUltimaActividadR: [],
    fechUltimaActividadM: [],
    fechaUltimaActividadT: [],
    fechaUltimoMovimientoA: []
  })
}
</script>

<style lang="scss" scoped></style>
